"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { emailHref, hero, socialLinks } from "@/lib/data";
import { iconMap } from "./icons";
import { POSES } from "./Pose";

const email = emailHref.replace(/^mailto:/, "");
const others = socialLinks.filter((link) => link.icon !== "email");

// The figure peeking in from the bottom-right corner. Clicking him makes him
// pop up next to a speech bubble with the contact details.
export default function PeekContact() {
  const [open, setOpen] = useState(false);
  // Starts tucked away so it never flashes over the hero before the observer runs.
  const [away, setAway] = useState(true);
  const [copied, setCopied] = useState<"" | "Copied" | "Copy failed">("");
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  const close = useCallback((returnFocus: boolean) => {
    setOpen(false);
    setCopied("");
    if (returnFocus) buttonRef.current?.focus();
  }, []);

  // Esc and outside clicks close it; focus moves into it on open.
  useEffect(() => {
    if (!open) return;
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close(true);
    };
    const onPointer = (e: PointerEvent) => {
      const t = e.target as Node;
      if (!dialogRef.current?.contains(t) && !buttonRef.current?.contains(t)) {
        close(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  // Stay tucked away while the hero or the contact band is on screen: the
  // hero has its own figure and notes in that corner, and the contact band
  // already shows everything the bubble would.
  useEffect(() => {
    const targets = ["about", "party"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length || !("IntersectionObserver" in window)) {
      setAway(false);
      return;
    }
    const showing = new Map<Element, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) showing.set(e.target, e.intersectionRatio >= 0.25);
        setAway([...showing.values()].some(Boolean));
      },
      { threshold: [0, 0.25, 0.5] },
    );
    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const hidden = away && !open;

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied("Copied");
    } catch {
      setCopied("Copy failed");
    }
  };

  return (
    <div
      className={`pointer-events-none fixed bottom-0 right-0 z-40 flex flex-col items-end transition-all duration-300 motion-reduce:transition-none sm:flex-row sm:items-end ${
        hidden ? "invisible translate-x-full" : ""
      }`}
    >
      <div
        ref={dialogRef}
        id="contact-popover"
        role="dialog"
        aria-labelledby="contact-popover-title"
        tabIndex={-1}
        className={`relative mx-3 mb-2 w-[min(20rem,calc(100vw-1.5rem))] outline-none rounded-brutal border-3 border-ink bg-white p-5 text-ink shadow-brutal-lg motion-reduce:transition-none sm:mx-0 sm:mb-40 ${
          // Visibility flips at once on open (so focus can land) and after the
          // fade on close.
          open
            ? "pointer-events-auto visible translate-y-0 opacity-100 [transition:opacity_300ms,transform_300ms,visibility_0s]"
            : "invisible translate-y-6 opacity-0 [transition:opacity_300ms,transform_300ms,visibility_0s_300ms]"
        }`}
      >
        {/* bubble tail pointing at him */}
        <span
          aria-hidden="true"
          className="absolute -bottom-[11px] right-10 h-5 w-5 rotate-45 border-b-3 border-r-3 border-ink bg-white sm:-right-[11px] sm:bottom-10 sm:border-b-0 sm:border-t-3"
        />
        <div className="flex items-start justify-between gap-3">
          <p id="contact-popover-title" className="font-display text-xl font-bold">
            Say hi
          </p>
          <button
            type="button"
            onClick={() => close(true)}
            aria-label="Close contact details"
            className="-mr-1 -mt-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-ink font-mono text-lg leading-none hover:bg-cream"
          >
            ×
          </button>
        </div>

        <p className="mt-3 font-mono text-xs uppercase tracking-wider text-ink/70">Email</p>
        <div className="mt-1 flex flex-wrap items-center gap-2">
          <a href={emailHref} className="break-all font-mono text-sm font-medium underline underline-offset-4">
            {email}
          </a>
          <button
            type="button"
            onClick={copy}
            className="rounded-full border-2 border-ink bg-cream px-3 py-1 font-mono text-xs font-medium hover:bg-yellow"
          >
            Copy
          </button>
          <span role="status" className="font-mono text-xs text-ink/70">
            {copied}
          </span>
        </div>

        <ul className="mt-4 flex flex-wrap gap-2">
          {others.map((link) => {
            const Icon = iconMap[link.icon as keyof typeof iconMap];
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-10 items-center gap-2 rounded-brutal-sm border-3 border-ink bg-cream px-3 font-display text-sm font-bold hover:-translate-y-0.5"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={emailHref}
          className="mt-4 flex items-center justify-center rounded-brutal-sm border-3 border-ink bg-orange px-4 py-2.5 font-display font-bold shadow-brutal-sm hover:-translate-y-0.5"
        >
          {hero.recruitLabel}
        </a>
      </div>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="contact-popover"
        aria-label={open ? "Hide contact details" : "Say hi: show contact details"}
        onClick={() => (open ? close(false) : setOpen(true))}
        className="pointer-events-auto shrink-0 rounded-tl-brutal"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/character/cut/peek.webp"
          alt=""
          width={POSES.peek.w}
          height={POSES.peek.h}
          loading="lazy"
          decoding="async"
          className={`block w-auto transition-[height,transform] duration-300 ease-out motion-reduce:transition-none ${
            open
              ? "h-[220px] sm:h-[340px]"
              : "h-[104px] translate-x-2 hover:translate-x-0 sm:h-[150px]"
          }`}
        />
      </button>
    </div>
  );
}
