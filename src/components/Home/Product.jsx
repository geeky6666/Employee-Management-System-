import React, { useState } from "react";
import { ArrowRight, Check, X, FileText, RotateCcw, ShieldCheck } from "lucide-react";
import { brand } from "../../brand";
import { statusMeta, statusOrder } from "../../utils/status";
import Reveal from "./Reveal";

// Public product section. The preview below is made-up sample content
// written right here. It never reads the real employees data.
const sampleTasks = {
  new: ["Design login screen"],
  active: ["Write user guide", "Test checkout"],
  submitted: ["Monthly report"],
  completed: ["Set up project", "Kick-off meeting"],
  failed: [],
};

const Product = ({ onSignUp, onLogin }) => {
  const [decision, setDecision] = useState(null); // null | "approved" | "rejected"

  return (
    <section id="product" className="scroll-mt-20 border-y border-border bg-surface">
      <div className="mx-auto max-w-6xl px-5 py-20">
        <Reveal>
          <p className="text-xs font-bold text-accent mb-3">Our product</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">Meet {brand.productName}.</h2>
          <p className="text-muted leading-relaxed mt-4 max-w-xl">
            A simple way for small teams to share tasks, approve finished work and track leave.
            The example below uses sample content only.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 mt-10">
          <Reveal>
            <ul className="flex flex-col gap-4">
              {[
                ["Task board", "Every task moves from New to Completed, so everyone knows what is happening."],
                ["Work approvals", "Employees upload proof of work. Managers approve or reject it."],
                ["Leave tracking", "Staff see their own leave balance and apply in one click."],
              ].map(([title, text]) => (
                <li key={title} className="flex gap-3">
                  <Check size={18} className="text-accent mt-0.5 shrink-0" />
                  <p className="text-sm text-muted leading-snug">
                    <span className="block font-bold text-ink text-base">{title}</span>{text}
                  </p>
                </li>
              ))}
              <li className="flex gap-3 rounded-lg bg-accent-soft p-4">
                <ShieldCheck size={18} className="text-accent mt-0.5 shrink-0" />
                <p className="text-sm text-ink leading-snug">
                  Salaries and personal details are private. Only the person and their admin can see them, after logging in.
                </p>
              </li>
            </ul>
            <div className="flex flex-wrap gap-3 mt-6">
              <button onClick={onSignUp} className="inline-flex items-center gap-2 bg-ink hover:bg-ink/90 text-white font-bold text-sm px-5 py-3 rounded-lg transition-colors">
                Create free account <ArrowRight size={15} />
              </button>
              <button onClick={onLogin} className="font-bold text-sm px-5 py-3 rounded-lg border border-border bg-bg hover:border-ink transition-colors">
                Workspace login
              </button>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="rounded-2xl border border-border bg-bg p-5">
              <p className="text-sm font-bold mb-4">Sample board</p>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {statusOrder.map((status) => (
                  <div key={status} className="min-w-0">
                    <p className={`text-[11px] font-bold mb-2 ${statusMeta[status].text}`}>{statusMeta[status].label}</p>
                    <div className="flex flex-col gap-2">
                      {sampleTasks[status].map((task) => (
                        <div key={task} className="rounded-md border border-border bg-surface px-2 py-2 text-xs font-medium">{task}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-border bg-surface p-4 mt-6">
                <p className="text-xs text-muted">Try it: review a sample submission</p>
                <p className="font-bold mt-1">Monthly report</p>
                <div className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted bg-surface-2 rounded-md px-2.5 py-1.5">
                  <FileText size={13} /> monthly-report.pdf
                </div>
                {decision === null ? (
                  <div className="flex gap-2 mt-4">
                    <button onClick={() => setDecision("approved")} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-status-completed/10 text-status-completed hover:bg-status-completed hover:text-white font-bold text-sm py-2.5 rounded-lg transition-colors">
                      <Check size={15} /> Approve
                    </button>
                    <button onClick={() => setDecision("rejected")} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-status-failed/10 text-status-failed hover:bg-status-failed hover:text-white font-bold text-sm py-2.5 rounded-lg transition-colors">
                      <X size={15} /> Reject
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 flex items-center justify-between animate-fade-up">
                    <span className={`text-sm font-bold ${decision === "approved" ? "text-status-completed" : "text-status-failed"}`}>
                      {decision === "approved" ? "Approved. Task moves to Completed." : "Rejected. Task moves to Failed."}
                    </span>
                    <button onClick={() => setDecision(null)} className="inline-flex items-center gap-1 text-xs font-semibold text-muted hover:text-ink">
                      <RotateCcw size={12} /> Reset
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Product;
