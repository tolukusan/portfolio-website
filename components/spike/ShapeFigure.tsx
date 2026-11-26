"use client";

// SPIKE (throwaway): Tolu's sketch as geometry. Sphere head, cylinder neck,
// truncated-cone torso, lathed "weird cone" legs, and a ring orbiting the
// head. Soft matte shading to match the Stitch mockups. three.js loads lazily.

import { useEffect, useRef } from "react";

export const OUTFITS = {
  sky: { body: 0xa9c9e8, legs: 0xa9c9e8 },
  charcoal: { body: 0x3a3a3c, legs: 0x3a3a3c },
  split: { body: 0xa9c9e8, legs: 0x3a3a3c },
} as const;
export type Outfit = keyof typeof OUTFITS;

const SKIN = 0x6b4430;
const ORANGE = 0xff6b35;
const RING = 0x8a8a8a;

export default function ShapeFigure({ outfit = "sky" }: { outfit?: Outfit }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const colors = OUTFITS[outfit];
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(22, 1, 0.1, 100);
      camera.position.set(0, 1.9, 11);
      camera.lookAt(0, 1.75, 0);

      // Soft studio light: sky/ground fill plus one key light.
      scene.add(new THREE.HemisphereLight(0xffffff, 0xd8d2c8, 2.2));
      const key = new THREE.DirectionalLight(0xffffff, 2.0);
      key.position.set(2.5, 4, 5);
      scene.add(key);

      const disposables: { dispose(): void }[] = [];
      const matte = (color: number) => {
        const m = new THREE.MeshStandardMaterial({ color, roughness: 0.85, metalness: 0 });
        disposables.push(m);
        return m;
      };
      const add = (
        geometry: import("three").BufferGeometry<import("three").NormalBufferAttributes>,
        material: import("three").Material,
        parent: import("three").Object3D,
        y: number,
      ) => {
        disposables.push(geometry);
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.y = y;
        parent.add(mesh);
        return mesh;
      };

      const figure = new THREE.Group();
      scene.add(figure);

      // Legs: one "weird truncated cone" — a lathed profile that swells at the
      // thigh and tapers to the ankle, like baggy trousers.
      const legProfile = [
        [0.0, 0.0],
        [0.26, 0.0],
        [0.29, 0.12],
        [0.37, 0.5],
        [0.43, 0.95],
        [0.42, 1.25],
        [0.37, 1.42],
        [0.0, 1.42],
      ].map(([r, y]) => new THREE.Vector2(r, y));
      add(new THREE.LatheGeometry(legProfile, 64), matte(colors.legs), figure, 0);

      // Torso: truncated cone, narrow at the shoulders, wide at the hem.
      const torsoH = 1.15;
      add(new THREE.CylinderGeometry(0.3, 0.47, torsoH, 64), matte(colors.body), figure, 1.38 + torsoH / 2);

      // Orange chest dot.
      const dot = add(new THREE.SphereGeometry(0.06, 24, 16), matte(ORANGE), figure, 2.25);
      dot.position.set(0.13, 2.25, 0.31);
      dot.scale.set(1, 1, 0.35);

      // Neck and head.
      add(new THREE.CylinderGeometry(0.11, 0.12, 0.3, 32), matte(SKIN), figure, 2.53 + 0.15);
      add(new THREE.SphereGeometry(0.37, 64, 48), matte(SKIN), figure, 3.12);

      // Orbit: two thin rings around the head, tilted, spinning.
      const orbit = new THREE.Group();
      orbit.position.y = 3.12;
      orbit.rotation.x = Math.PI / 2 - 0.22;
      orbit.rotation.y = 0.12;
      figure.add(orbit);
      const ringMat = matte(RING);
      const beadGeo = new THREE.SphereGeometry(0.035, 16, 12);
      disposables.push(beadGeo);
      for (const [i, r] of [0.62, 0.67].entries()) {
        const g = new THREE.TorusGeometry(r, 0.008, 8, 128);
        disposables.push(g);
        orbit.add(new THREE.Mesh(g, ringMat));
        // A bead on each ring, on opposite sides, so the spin is visible.
        const bead = new THREE.Mesh(beadGeo, i === 0 ? matte(ORANGE) : ringMat);
        const a = i === 0 ? 0 : Math.PI;
        bead.position.set(Math.cos(a) * r, Math.sin(a) * r, 0);
        orbit.add(bead);
      }

      // Soft contact shadow.
      const shadowGeo = new THREE.CircleGeometry(0.75, 48);
      const shadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.1 });
      disposables.push(shadowGeo, shadowMat);
      const shadow = new THREE.Mesh(shadowGeo, shadowMat);
      shadow.rotation.x = -Math.PI / 2;
      shadow.scale.set(1, 0.5, 1);
      shadow.position.y = 0.005;
      scene.add(shadow);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      figure.rotation.y = -0.45;

      function resize() {
        const { clientWidth: w, clientHeight: h } = mount!;
        renderer.setSize(w, h, false);
        renderer.domElement.style.width = "100%";
        renderer.domElement.style.height = "100%";
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      }
      resize();
      const observer = new ResizeObserver(resize);
      observer.observe(mount);

      let paused = false;
      const onEnter = () => (paused = true);
      const onLeave = () => (paused = false);
      mount.addEventListener("pointerenter", onEnter);
      mount.addEventListener("pointerleave", onLeave);

      let frame = 0;
      let last = performance.now();
      function tick(now: number) {
        const dt = Math.min((now - last) / 1000, 0.05);
        last = now;
        // The ring always orbits; the body turns slowly unless hovered.
        orbit.rotation.z += dt * 1.2;
        orbit.rotation.x = Math.PI / 2 - 0.22 + Math.sin(now / 1400) * 0.06;
        if (!paused) figure.rotation.y += dt * 0.35;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      }
      if (!reduceMotion) frame = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        mount.removeEventListener("pointerenter", onEnter);
        mount.removeEventListener("pointerleave", onLeave);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [outfit]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
