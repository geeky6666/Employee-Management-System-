import React from "react";
import { brand } from "../../brand";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2.5">
          <div className="h-7 w-7 rounded-md bg-accent text-white font-display text-sm font-semibold flex items-center justify-center">
            N
          </div>
          <span className="font-display font-semibold">{brand.name}</span>
          <span className="text-sm text-muted ml-2 hidden sm:inline">
            {brand.tagline}
          </span>
        </div>
        <p className="text-xs text-muted">
          © {new Date().getFullYear()} {brand.name}. {brand.city}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
