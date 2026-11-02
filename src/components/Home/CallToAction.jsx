import React from "react";
import { Mail } from "lucide-react";
import { brand } from "../../brand";
import Reveal from "./Reveal";

// The big closing section. Also acts as the "Contact" anchor.
const CallToAction = () => {
  return (
    <section id="contact" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-20">
      <Reveal>
        <div className="rounded-2xl bg-accent text-white px-8 py-14 sm:px-14 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl mx-auto !text-white">
            Have a product idea? Let's build it together.
          </h2>
          <p className="mt-4 text-white/80 max-w-xl mx-auto">
            Tell us what you need. We reply within one working day with a
            plan and a clear estimate.
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <a
              href={`mailto:${brand.email}`}
              className="inline-flex items-center gap-2 bg-white text-accent font-semibold text-sm px-6 py-3.5 rounded-md hover:bg-accent-soft transition-colors"
            >
              <Mail size={16} /> {brand.email}
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  );
};

export default CallToAction;
