import Link from "next/link";
import { Logo } from "@/components/logo";

export function Footer() {
  return (
    <footer className="border-t border-[hsl(var(--border))] py-16">
      <div className="container-custom">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="h-7 w-7" />
              <span className="font-heading text-lg">Career Copilot</span>
            </Link>
            <p className="mt-4 text-sm text-[hsl(var(--muted-foreground))] leading-relaxed max-w-xs">
              The career OS that treats you like a product worth launching.
            </p>
          </div>
          <div className="md:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { title: "Product", links: ["Features", "Templates", "Pricing", "Changelog"] },
              { title: "Use cases", links: ["Resume", "Cover letter", "Interview prep", "Tracker"] },
              { title: "Company", links: ["About", "Manifesto", "Careers", "Press"] },
              { title: "Legal", links: ["Terms", "Privacy", "Security", "Contact"] }
            ].map((col) => (
              <div key={col.title}>
                <div className="label-mono mb-4">{col.title}</div>
                <ul className="space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a
                        href="#"
                        className="text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                      >
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-[hsl(var(--border))] flex flex-col md:flex-row gap-4 justify-between text-xs text-[hsl(var(--muted-foreground))]">
          <div>© {new Date().getFullYear()} Career Copilot. Built for humans who ship.</div>
          <div className="font-mono">v1.0.0 · Lisbon → Everywhere</div>
        </div>
      </div>
    </footer>
  );
}
