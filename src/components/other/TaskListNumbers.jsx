import React from "react";

// A quick "at a glance" progress overview: total task count plus a
// single stacked bar showing the mix of statuses. The exact counts
// per column are already visible on the board below, so this widget
// is about the overall *proportion* rather than repeating numbers.
const segments = [
  { status: "new", label: "New", color: "bg-status-new" },
  { status: "active", label: "Active", color: "bg-status-active" },
  { status: "submitted", label: "Submitted", color: "bg-status-submitted" },
  { status: "completed", label: "Completed", color: "bg-status-completed" },
  { status: "failed", label: "Failed", color: "bg-status-failed" },
];

const TaskListNumbers = ({ employee }) => {
  const total = employee.tasks.length;

  const countByStatus = (status) =>
    employee.tasks.filter((task) => task.status === status).length;

  return (
    <div className="bg-surface border border-border rounded-lg px-5 py-4 mt-6">
      <div className="flex items-baseline justify-between mb-3">
        <h2 className="text-sm font-medium text-muted">Your progress</h2>
        <span className="font-display text-sm font-medium">
          {total} task{total !== 1 ? "s" : ""} total
        </span>
      </div>

      {/* stacked bar */}
      <div className="flex h-2 w-full rounded-full overflow-hidden bg-surface-2">
        {total === 0 ? null : (
          segments.map((segment) => {
            const count = countByStatus(segment.status);
            if (count === 0) return null;
            return (
              <div
                key={segment.status}
                className={segment.color}
                style={{ width: `${(count / total) * 100}%` }}
                title={`${segment.label}: ${count}`}
              />
            );
          })
        )}
      </div>

      {/* legend */}
      <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-3">
        {segments.map((segment) => (
          <div key={segment.status} className="flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${segment.color}`} />
            <span className="text-xs text-muted">
              {segment.label} · {countByStatus(segment.status)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskListNumbers;
