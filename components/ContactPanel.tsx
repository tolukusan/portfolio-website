import { socialLinks } from "@/lib/data";
import { iconMap } from "./icons";

export default function ContactPanel() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 rounded-brutal border-3 border-ink bg-ink p-6 text-cream shadow-brutal sm:p-8"
    >
      <p className="font-mono text-xs text-mint">// let&apos;s work together</p>
      <h2 className="mt-2 font-display text-2xl font-bold sm:text-3xl">
        Get in touch
      </h2>

      <div className="mt-4 rounded-brutal-sm border-3 border-cream/30 bg-cream/5 p-4 sm:p-5">
        <p className="text-sm text-cream/90 sm:text-base">
          I like building backend systems that hold up under real usage, and
          the products around them. If you&apos;re hiring or have a project
          in mind, I&apos;d love to hear from you.
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {socialLinks.map((link) => {
          const Icon = iconMap[link.icon as keyof typeof iconMap];
          const isExternal = link.href.startsWith("http");
          return (
            <a
              key={link.label}
              href={link.href}
              aria-label={link.label}
              {...(isExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-cream/40 text-cream transition-all hover:-translate-y-0.5 hover:border-yellow hover:text-yellow"
            >
              <Icon className="h-5 w-5" />
            </a>
          );
        })}
      </div>

    </section>
  );
}
