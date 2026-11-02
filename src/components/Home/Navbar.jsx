import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { brand } from "../../brand";

// Sticky top navigation for the public homepage.
// onLogin / onSignUp -> functions from App.jsx that switch the page
const links = [
  { label: "Services", href: "#services" },
  { label: "Our work", href: "#work" },
  { label: "Product", href: "#product" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = ({ onLogin, onSignUp }) => {
  const [open, setOpen] = useState(false); // mobile menu open/closed
  const [scrolled, setScrolled] = useState(false); // adds a border after scrolling

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur bg-bg/85 transition-colors ${
        scrolled ? "border-b border-border" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-5 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-md bg-accent text-white font-display font-semibold flex items-center justify-center">
            N
          </div>
          <span className="font-extrabold text-lg tracking-tight">
            {brand.name}
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted hover:text-ink transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={onLogin}
            className="text-sm font-medium text-ink hover:text-accent px-3 py-2 transition-colors"
          >
            Workspace login
          </button>
          <a
            href="#contact"
            className="text-sm font-semibold bg-accent hover:bg-accent-hover text-white px-4 py-2 rounded-md transition-colors"
          >
            Contact us
          </a>
        </div>

        <button
          onClick={() => setOpen((prev) => !prev)}
          className="md:hidden p-2 -mr-2 text-ink"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-border bg-surface px-5 py-4 flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-ink py-1"
            >
              {link.label}
            </a>
          ))}
          <div className="flex gap-3 pt-2">
            <button
              onClick={onLogin}
              className="flex-1 text-sm font-medium border border-border rounded-md py-2.5"
            >
              Log in
            </button>
            <button
              onClick={onSignUp}
              className="flex-1 text-sm font-semibold bg-accent text-white rounded-md py-2.5"
            >
              Get started
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
