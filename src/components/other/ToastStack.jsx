import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

// Small pop-up messages in the bottom-right corner ("Task assigned",
// "Leave applied"...). App.jsx owns the list; this just displays it.
// toasts    -> [{ id, message, type }]  type: "success" | "error" | "info"
// onDismiss -> called with a toast id when the user clicks the X
// (light tints so the icon is readable on the dark toast background)
const styles = {
  success: { icon: CheckCircle2, color: "#4ADE80" },
  error: { icon: AlertCircle, color: "#F87171" },
  info: { icon: Info, color: "#93C5FD" },
};

const ToastStack = ({ toasts, onDismiss }) => {
  return (
    <div
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 w-[calc(100vw-2.5rem)] sm:w-80"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const { icon: Icon, color } = styles[toast.type] || styles.info;
        return (
          <div
            key={toast.id}
            className="animate-slide-in flex items-start gap-3 bg-ink text-white rounded-xl px-4 py-3.5 shadow-xl shadow-ink/20"
          >
            <Icon size={18} color={color} className="shrink-0 mt-0.5" />
            <p className="text-sm leading-snug flex-1">{toast.message}</p>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-white/50 hover:text-white transition-colors"
              aria-label="Dismiss"
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastStack;
