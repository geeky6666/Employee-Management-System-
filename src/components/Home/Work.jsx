import React from "react";
import { Check } from "lucide-react";
import { projects } from "../../brand";
import Reveal from "./Reveal";

// "Our work": public case studies. Content lives in brand.js.
const Work = () => (
  <section id="work" className="scroll-mt-20 mx-auto max-w-6xl px-5 py-20">
    <Reveal>
      <p className="text-xs font-bold text-accent mb-3">Our work</p>
      <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
        What we have been building.
      </h2>
      <p className="text-muted leading-relaxed mt-4 max-w-xl">
        A few examples of the problems we solve. We keep client names and private details out of this page.
      </p>
    </Reveal>

    <div className="grid md:grid-cols-2 gap-5 mt-12">
      {projects.map((project, index) => (
        <Reveal key={project.title} delay={index * 80}>
          <article className="h-full rounded-xl border border-border bg-surface p-6 flex flex-col">
            <p className="text-xs font-semibold text-accent">{project.kind}</p>
            <h3 className="text-xl font-bold mt-1.5">{project.title}</h3>
            <p className="text-sm text-muted leading-relaxed mt-3">{project.text}</p>
            <ul className="mt-4 flex flex-col gap-2">
              {project.results.map((result) => (
                <li key={result} className="flex items-center gap-2 text-sm">
                  <Check size={15} className="text-status-completed shrink-0" /> {result}
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 mt-auto pt-5">
              {project.tech.map((tech) => (
                <span key={tech} className="text-xs rounded-md bg-surface-2 border border-border px-2 py-1 text-muted">
                  {tech}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  </section>
);

export default Work;
