import React from "react";
import { ListChecks } from "lucide-react";

// A cycle of colors used for employee avatars, just so the roster
// doesn't look monotone. Has nothing to do with task status.
const avatarColors = ["bg-status-new", "bg-gold", "bg-status-completed", "bg-status-failed", "bg-status-submitted"];

// Shows each employee's task progress at a glance (used in the admin's
// "Tasks" tab). For salary and leave info, see the "Team" tab instead.
const AllTask = ({ employees }) => {
  const countByStatus = (tasks, status) =>
    tasks.filter((task) => task.status === status).length;

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2 className="font-bold text-base mb-5 flex items-center gap-2">
        <ListChecks size={17} className="text-accent" /> Task progress by employee
      </h2>

      <div className="flex flex-col gap-4">
        {employees.map((employee, i) => {
          const total = employee.tasks.length;
          const newCount = countByStatus(employee.tasks, "new");
          const activeCount = countByStatus(employee.tasks, "active");
          const submittedCount = countByStatus(employee.tasks, "submitted");
          const completedCount = countByStatus(employee.tasks, "completed");
          const failedCount = countByStatus(employee.tasks, "failed");

          return (
            <div
              key={employee.id}
              className="border border-border rounded-lg p-4"
            >
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`h-8 w-8 shrink-0 rounded-full ${avatarColors[i % avatarColors.length]} flex items-center justify-center text-white text-xs font-semibold`}
                >
                  {employee.firstName.charAt(0)}
                </div>
                <div className="min-w-0">
                  <h3 className="text-sm font-medium truncate">
                    {employee.firstName}
                  </h3>
                  <p className="text-xs text-muted truncate">
                    {employee.designation}
                  </p>
                </div>
                <span className="ml-auto text-xs text-muted whitespace-nowrap font-mono">
                  {completedCount}/{total} done
                </span>
              </div>

              <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-surface-2">
                {total > 0 && (
                  <>
                    <div
                      className="bg-status-new"
                      style={{ width: `${(newCount / total) * 100}%` }}
                    />
                    <div
                      className="bg-status-active"
                      style={{ width: `${(activeCount / total) * 100}%` }}
                    />
                    <div
                      className="bg-status-submitted"
                      style={{ width: `${(submittedCount / total) * 100}%` }}
                    />
                    <div
                      className="bg-status-completed"
                      style={{ width: `${(completedCount / total) * 100}%` }}
                    />
                    <div
                      className="bg-status-failed"
                      style={{ width: `${(failedCount / total) * 100}%` }}
                    />
                  </>
                )}
                {total === 0 && (
                  <div className="h-full w-full bg-surface-2" />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllTask;
