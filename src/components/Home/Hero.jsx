import React, { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { brand, techStack, rotatingWords, currentWork } from "../../brand";

// The top of the public homepage. It uses only general, public
// information from brand.js: no employee, salary or client data.
const Hero = ({ onSignUp }) => {
  // The headline word changes every 2.4 seconds.
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const timer = setInterval(
      () => setWordIndex((prev) => (prev + 1) % rotatingWords.length),
      2400
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="top" className="mx-auto max-w-6xl px-5 pt-14 pb-20 md:pt-20 md:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-14 items-center">
        <div className="min-w-0">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold leading-[1.1] tracking-tight">
            We build web apps that grow with your{" "}
            <span key={rotatingWords[wordIndex]} className="inline-block text-accent animate-word-in">
              {rotatingWords[wordIndex]}.
            </span>
          </h1>

          <p className="text-lg text-muted leading-relaxed mt-5 max-w-xl">
            {brand.name} is a web application studio. We design, build and look after the
            software your team depends on, from internal tools to online stores.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold text-sm px-6 py-3.5 rounded-lg shadow-lg shadow-accent/25 hover:-translate-y-0.5 transition-all"
            >
              Talk to us
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#work"
              className="inline-flex items-center border border-border bg-surface hover:border-ink text-ink font-bold text-sm px-6 py-3.5 rounded-lg transition-colors"
            >
              See our work
            </a>
          </div>

          <div className="mt-10">
            <p className="text-xs font-semibold text-muted mb-3">Built with</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="text-xs font-medium rounded-md border border-border bg-surface px-2.5 py-1 text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* What we are working on right now (general descriptions only) */}
        <div className="min-w-0 rounded-2xl border border-border bg-surface shadow-xl shadow-ink/5 overflow-hidden">
          <div className="px-5 py-4 border-b border-border bg-surface-2">
            <p className="font-bold">In the studio right now</p>
            <p className="text-xs text-muted mt-0.5">Projects we are building this month</p>
          </div>
          <ul className="divide-y divide-border">
            {currentWork.map((item) => (
              <li key={item.title} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold">{item.title}</p>
                  <span className="shrink-0 text-[11px] font-semibold rounded-full bg-accent-soft text-accent px-2.5 py-1">
                    {item.stage}
                  </span>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full rounded-full bg-accent" style={{ width: `${item.progress}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Hero;
