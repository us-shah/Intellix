import Link from "next/link";
import { Linkedin, Twitter, Github, Facebook } from "lucide-react";
import { divisions } from "@/lib/data";

const footerColumns = [
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Team", href: "/team" },
      { label: "Careers", href: "/careers" },
      { label: "Research", href: "/research" }
    ]
  },
  {
    title: "Work",
    links: [
      { label: "Portfolio", href: "/portfolio" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Pricing", href: "/pricing" },
      { label: "Client Portal", href: "/portal/client" }
    ]
  },
  {
    title: "Academy",
    links: [
      { label: "Courses", href: "/academy" },
      { label: "Student Portal", href: "/portal/student" },
      { label: "Gallery", href: "/gallery" },
      { label: "Blog", href: "/blog" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "FAQs", href: "/faqs" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-surface">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <Link href="/" className="flex items-center gap-2 font-heading text-lg font-bold">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-signal-gradient text-sm text-white">
                IX
              </span>
              Intellix
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Building intelligent solutions for tomorrow — software, AI, data, and cloud
              engineering, plus the academy training the engineers who build it.
            </p>
            <div className="mt-6 flex gap-4 text-muted">
              <Link href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-cyan">
                <Linkedin size={18} />
              </Link>
              <Link href="https://twitter.com" aria-label="Twitter" className="hover:text-cyan">
                <Twitter size={18} />
              </Link>
              <Link href="https://github.com" aria-label="GitHub" className="hover:text-cyan">
                <Github size={18} />
              </Link>
              <Link href="https://facebook.com" aria-label="Facebook" className="hover:text-cyan">
                <Facebook size={18} />
              </Link>
            </div>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="font-heading text-sm font-semibold text-ink">{col.title}</h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-white/5 pt-6">
          <p className="mb-4 text-xs uppercase tracking-wider text-muted/70">Divisions</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {divisions.map((d) => (
              <Link
                key={d.slug}
                href={`/services/${d.slug}`}
                className="text-xs text-muted hover:text-cyan"
              >
                {d.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} Intellix. All rights reserved.</p>
          <p>Karachi, Pakistan · hello@intellix.com</p>
        </div>
      </div>
    </footer>
  );
}
