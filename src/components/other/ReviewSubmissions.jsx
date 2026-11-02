import React from "react";
import { FileClock } from "lucide-react";
import TaskCard from "../TaskList/TaskCard";

// Shows every task (from every employee) that is waiting for the
// admin's review, with an "Approve" / "Reject" choice on each one.
// employees  -> the full list of employees
// reviewTask -> function from App.jsx: reviewTask(employeeId, taskIndex, decision)
const ReviewSubmissions = ({ employees, reviewTask }) => {
  // Flatten every employee's tasks into one list, keeping track of
  // which employee and which task-index each one came from, then
  // keep only the ones that are waiting for review.
  const submissions = employees.flatMap((employee) =>
    employee.tasks
      .map((task, taskIndex) => ({ employee, task, taskIndex }))
      .filter(({ task }) => task.status === "submitted")
  );

  if (submissions.length === 0) return null; // nothing to review right now

  return (
    <div className="bg-status-submitted/5 border border-status-submitted/30 rounded-lg p-6 mb-5">
      <div className="flex items-center gap-2 mb-5">
        <FileClock size={17} className="text-status-submitted" />
        <h2 className="font-bold text-base">
          Submissions to review
        </h2>
        <span className="text-xs text-muted">({submissions.length})</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {submissions.map(({ employee, task, taskIndex }) => (
          <div key={`${employee.id}-${taskIndex}`}>
            <p className="text-xs text-muted mb-1.5">
              Submitted by <span className="text-ink font-medium">{employee.firstName}</span>
            </p>
            <TaskCard
              task={task}
              taskIndex={taskIndex}
              onReview={(decision) =>
                reviewTask(employee.id, taskIndex, decision)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSubmissions;
