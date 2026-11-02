import React from "react";
import {
  LayoutDashboard,
  ShoppingBag,
  ServerCog,
  PenTool,
  Cloud,
  LifeBuoy,
} from "lucide-react";
import { services } from "../../brand";
import Reveal from "./Reveal";

// brand.js stores icon names as plain text, so we map each name to
// the real icon component here.
const iconMap = { LayoutDashboard, ShoppingBag, ServerCog, PenTool, Cloud, LifeBuoy };

const Services = () => {
  return (
    <section id="services" className="scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-bold text-accent mb-3">
            What we do
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
            Everything you need to ship a web product.
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon];
            return (
              <Reveal key={service.title} delay={index * 80}>
                <div className="group h-full rounded-xl border border-border bg-bg p-6 hover:-translate-y-1 hover:border-accent hover:shadow-lg hover:shadow-ink/5 transition-all duration-300">
                  <div className="h-10 w-10 rounded-lg bg-accent-soft text-accent flex items-center justify-center mb-5 group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-display text-lg font-semibold mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {service.text}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
