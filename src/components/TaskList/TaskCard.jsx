import React, { useState } from "react";
import { Check, X, Clock, FileText, CheckCircle2, XCircle } from "lucide-react";

// One task card shown inside a Kanban column.
// Instead of having a separate file per status, we use ONE TaskCard
// component and just change its accent color and its controls based
// on task.status.

const accentByStatus = {
  new: "border-l-status-new",
  active: "border-l-status-active",
  submitted: "border-l-status-submitted",
  completed: "border-l-status-completed",
  failed: "border-l-status-failed",
};

// employee's card: onUpdateStatus(taskIndex, newStatus) and
// onSubmitWork(taskIndex, file) are only used on the employee side.
// onReview(decision) is only used on the admin side (decision is
// "approved" or "rejected"). Any of these can be left undefined --
// the card only shows the controls it has a handler for.
const TaskCard = ({ task, taskIndex, onUpdateStatus, onSubmitWork, onReview }) => {
  // Holds the PDF the employee picked, before they hit "Submit work".
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    if (!selectedFile) return;
    onSubmitWork(taskIndex, selectedFile);
    setSelectedFile(null);
  };

  return (
    <div
      className={`bg-surface border border-border border-l-[3px] ${accentByStatus[task.status]} rounded-lg p-4 shadow-sm`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-medium bg-surface-2 text-muted px-2 py-0.5 rounded truncate min-w-0">
          {task.category}
        </span>
        <span className="text-[11px] text-muted font-mono whitespace-nowrap shrink-0 ml-2">{task.taskDate}</span>
      </div>

      <h3 className="font-bold text-base leading-snug mb-1.5">
        {task.taskTitle}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4">
        {task.taskDescription}
      </p>

      {/* ---- New: employee can accept the task ---- */}
      {task.status === "new" && onUpdateStatus && (
        <button
          onClick={() => onUpdateStatus(taskIndex, "active")}
          className="w-full bg-status-new/10 text-status-new hover:bg-status-new/20 font-medium text-xs py-2 rounded-md transition-colors"
        >
          Accept task
        </button>
      )}

      {/* ---- Active: employee uploads a PDF as proof of work ---- */}
      {task.status === "active" && onSubmitWork && (
        <div className="flex flex-col gap-2">
          <label className="text-[11px] text-muted cursor-pointer border border-dashed border-border hover:border-accent rounded-md px-3 py-2 text-center transition-colors truncate">
            {selectedFile ? selectedFile.name : "Choose PDF"}
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setSelectedFile(e.target.files[0] || null)}
              className="hidden"
            />
          </label>
          <button
            onClick={handleSubmit}
            disabled={!selectedFile}
            className="w-full bg-status-active/10 text-status-active hover:bg-status-active/20 disabled:opacity-40 disabled:cursor-not-allowed font-medium text-xs py-2 rounded-md transition-colors"
          >
            Submit work for review
          </button>
        </div>
      )}

      {/* ---- Submitted: waiting for the admin to review the PDF ---- */}
      {task.status === "submitted" && (
        <div className="flex flex-col gap-2">
          <div className="text-xs font-medium text-status-submitted flex items-center gap-1.5">
            <Clock size={13} /> Waiting for admin review
          </div>
          {task.workFile && (
            <a
              href={task.workFile.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted hover:text-accent underline decoration-dotted truncate flex items-center gap-1.5"
            >
              <FileText size={13} /> {task.workFile.name}
            </a>
          )}

          {/* Admin-only controls: approve or reject the submission */}
          {onReview && (
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => onReview("approved")}
                className="flex-1 flex items-center justify-center gap-1 bg-status-completed/10 text-status-completed hover:bg-status-completed/20 font-medium text-xs py-2 rounded-md transition-colors"
              >
                <Check size={13} /> Approve
              </button>
              <button
                onClick={() => onReview("rejected")}
                className="flex-1 flex items-center justify-center gap-1 bg-status-failed/10 text-status-failed hover:bg-status-failed/20 font-medium text-xs py-2 rounded-md transition-colors"
              >
                <X size={13} /> Reject
              </button>
            </div>
          )}
        </div>
      )}

      {/* ---- Completed ---- */}
      {task.status === "completed" && (
        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-medium text-status-completed flex items-center gap-1.5">
            <CheckCircle2 size={13} /> Completed
          </div>
          {task.workFile && (
            <a
              href={task.workFile.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted hover:text-accent underline decoration-dotted truncate flex items-center gap-1.5"
            >
              <FileText size={13} /> {task.workFile.name}
            </a>
          )}
        </div>
      )}

      {/* ---- Failed (rejected by admin) ---- */}
      {task.status === "failed" && (
        <div className="flex flex-col gap-1.5">
          <div className="text-xs font-medium text-status-failed flex items-center gap-1.5">
            <XCircle size={13} /> Failed
          </div>
          {task.workFile && (
            <a
              href={task.workFile.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-muted hover:text-accent underline decoration-dotted truncate flex items-center gap-1.5"
            >
              <FileText size={13} /> {task.workFile.name}
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
