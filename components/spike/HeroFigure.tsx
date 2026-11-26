"use client";

// SPIKE (throwaway): a chibi figure built from primitives, cel-shaded with
// ink outlines, slowly turning. three.js is imported lazily after mount so
// it never blocks the page's text.

import { useEffect, useRef } from "react";

const COLORS = {
  ink: 0x111111,
  suit: 0x26262b,
  stripe: 0xfdf6e9,
  skin: 0x8a5a3b,
  orange: 0xff6b35,
  yellow: 0xffc93c,
  sneaker: 0xffffff,
  sole: 0xe8e1d4,
};

export const SUITS = {
  ink: { suit: 0x26262b, stripe: 0xfdf6e9 },
  orange: { suit: 0xff6b35, stripe: 0xfdf6e9 },
  yellow: { suit: 0xffc93c, stripe: 0x111111 },
  sky: { suit: 0xa9d8ff, stripe: 0x111111 },
} as const;
export type Suit = keyof typeof SUITS;

export default function HeroFigure({ suit = "ink" }: { suit?: Suit }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    const palette = { ...COLORS, ...SUITS[suit] };
    if (!mount) return;
    let disposed = false;
    let cleanup = () => {};

    (async () => {
      const THREE = await import("three");
      if (disposed) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // no WebGL: the page still works, just without the figure
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      mount.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(24, 1, 0.1, 100);
      camera.position.set(0, 1.3, 10.5);
      camera.lookAt(0, 1.05, 0);

      scene.add(new THREE.AmbientLight(0xffffff, 1.4));
      const sun = new THREE.DirectionalLight(0xffffff, 2.2);
      sun.position.set(3, 5, 4);
      scene.add(sun);

      // 3-step ramp for crisp cel shading.
      const ramp = new THREE.DataTexture(
        new Uint8Array([90, 90, 90, 255, 170, 170, 170, 255, 255, 255, 255, 255]),
        3,
        1,
        THREE.RGBAFormat,
      );
      ramp.minFilter = THREE.NearestFilter;
      ramp.magFilter = THREE.NearestFilter;
      ramp.needsUpdate = true;

      const toon = (color: number) =>
        new THREE.MeshToonMaterial({ color, gradientMap: ramp });

      // Inverted-hull outline: the same geometry pushed out along its normals,
      // drawn back-faces only in ink.
      const outline = new THREE.ShaderMaterial({
        side: THREE.BackSide,
        uniforms: { thickness: { value: 0.028 } },
        vertexShader: `
          uniform float thickness;
          void main() {
            vec3 p = position + normal * thickness;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
          }`,
        fragmentShader: `void main() { gl_FragColor = vec4(0.067, 0.067, 0.067, 1.0); }`,
      });

      const geometries: import("three").BufferGeometry<import("three").NormalBufferAttributes>[] = [];
      function part(
        geometry: import("three").BufferGeometry<import("three").NormalBufferAttributes>,
        color: number,
        parent: InstanceType<typeof THREE.Object3D>,
        pos: [number, number, number] = [0, 0, 0],
        rot: [number, number, number] = [0, 0, 0],
        withOutline = true,
      ) {
        geometries.push(geometry);
        const mesh = new THREE.Mesh(geometry, toon(color));
        mesh.position.set(...pos);
        mesh.rotation.set(...rot);
        if (withOutline) mesh.add(new THREE.Mesh(geometry, outline));
        parent.add(mesh);
        return mesh;
      }

      const figure = new THREE.Group();
      scene.add(figure);

      // Head: big chibi sphere, no features. Small ears.
      part(new THREE.SphereGeometry(0.66, 48, 32), COLORS.skin, figure, [0, 2.2, 0]);
      for (const x of [-0.66, 0.66]) {
        part(new THREE.SphereGeometry(0.12, 24, 16), COLORS.skin, figure, [x, 2.15, -0.02]);
      }

      // Jacket: torso capsule, collar ring, orange chest mark, zip line.
      part(new THREE.CapsuleGeometry(0.36, 0.34, 8, 24), palette.suit, figure, [0, 1.2, 0]);
      part(
        new THREE.TorusGeometry(0.22, 0.07, 12, 32),
        palette.suit,
        figure,
        [0, 1.6, 0],
        [Math.PI / 2, 0, 0],
      );
      part(new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24), (suit === "orange" ? COLORS.yellow : COLORS.orange), figure, [0.15, 1.35, 0.35], [Math.PI / 2, 0, 0], false);
      part(new THREE.BoxGeometry(0.018, 0.55, 0.02), palette.stripe, figure, [0, 1.2, 0.365], [0, 0, 0], false);

      // Arms hanging slightly out, cream stripes down the outside, brown hands.
      for (const side of [-1, 1]) {
        const arm = new THREE.Group();
        arm.position.set(side * 0.43, 1.42, 0);
        arm.rotation.z = side * 0.18;
        figure.add(arm);
        part(new THREE.CapsuleGeometry(0.12, 0.42, 8, 16), palette.suit, arm, [0, -0.3, 0]);
        for (const dz of [-0.035, 0.035]) {
          part(new THREE.BoxGeometry(0.02, 0.5, 0.018), palette.stripe, arm, [side * 0.118, -0.3, dz], [0, 0, 0], false);
        }
        part(new THREE.SphereGeometry(0.1, 20, 14), COLORS.skin, arm, [0, -0.62, 0.02]);
      }

      // Baggy track pants with side stripes.
      for (const side of [-1, 1]) {
        part(new THREE.CylinderGeometry(0.19, 0.16, 0.62, 24), palette.suit, figure, [side * 0.17, 0.6, 0]);
        part(new THREE.BoxGeometry(0.02, 0.6, 0.02), palette.stripe, figure, [side * 0.35, 0.6, 0], [0, 0, side * -0.05], false);
        // Chunky sneaker: rounded toe capsule plus a sole.
        part(
          new THREE.CapsuleGeometry(0.14, 0.2, 8, 16),
          COLORS.sneaker,
          figure,
          [side * 0.17, 0.2, 0.06],
          [Math.PI / 2, 0, 0],
        );
        part(new THREE.BoxGeometry(0.3, 0.06, 0.5), COLORS.sole, figure, [side * 0.17, 0.07, 0.06]);
      }

      // Soft ground shadow.
      const shadowGeo = new THREE.CircleGeometry(0.7, 32);
      geometries.push(shadowGeo);
      const shadow = new THREE.Mesh(
        shadowGeo,
        new THREE.MeshBasicMaterial({ color: COLORS.ink, transparent: true, opacity: 0.12 }),
      );
      shadow.rotation.x = -Math.PI / 2;
      shadow.scale.set(1, 0.55, 1);
      shadow.position.y = 0.01;
      scene.add(shadow);

      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      figure.rotation.y = -0.5; // three-quarter pose

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
        if (!paused) figure.rotation.y += dt * 0.5;
        renderer.render(scene, camera);
        frame = requestAnimationFrame(tick);
      }
      if (!reduceMotion) frame = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(frame);
        observer.disconnect();
        mount.removeEventListener("pointerenter", onEnter);
        mount.removeEventListener("pointerleave", onLeave);
        geometries.forEach((g) => g.dispose());
        ramp.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => {
      disposed = true;
      cleanup();
    };
  }, [suit]);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
