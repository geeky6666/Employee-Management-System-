// The look of each task status (label + colours), shared by the homepage
// demo, the board and the admin screens so a status always looks the same.
export const statusMeta = {
  new: { label: "New", dot: "bg-status-new", text: "text-status-new", soft: "bg-status-new/10" },
  active: { label: "Active", dot: "bg-status-active", text: "text-status-active", soft: "bg-status-active/10" },
  submitted: { label: "Submitted", dot: "bg-status-submitted", text: "text-status-submitted", soft: "bg-status-submitted/10" },
  completed: { label: "Completed", dot: "bg-status-completed", text: "text-status-completed", soft: "bg-status-completed/10" },
  failed: { label: "Failed", dot: "bg-status-failed", text: "text-status-failed", soft: "bg-status-failed/10" },
};

export const statusOrder = ["new", "active", "submitted", "completed", "failed"];
