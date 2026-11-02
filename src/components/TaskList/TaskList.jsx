import React from "react";
import TaskCard from "./TaskCard";

// Renders the employee's tasks as a Kanban board, one column per
// status. This makes the task workflow (New -> Active -> Submitted ->
// Completed / Failed) visually obvious at a glance.
const columns = [
  { status: "new", label: "New", dot: "bg-status-new" },
  { status: "active", label: "Active", dot: "bg-status-active" },
  { status: "submitted", label: "Submitted", dot: "bg-status-submitted" },
  { status: "completed", label: "Completed", dot: "bg-status-completed" },
  { status: "failed", label: "Failed", dot: "bg-status-failed" },
];

// employee         -> the logged-in employee object (has .tasks array)
// updateTaskStatus -> function from App.jsx to change a task's status (used for "Accept task")
// submitTaskWork   -> function from App.jsx to upload a PDF and move a task to "submitted"
// query            -> text typed in the search box (empty = show everything)
const TaskList = ({ employee, updateTaskStatus, submitTaskWork, query = "" }) => {
  const text = query.trim().toLowerCase();

  // a task matches if the search text is in its title, description or category
  const matches = (task) =>
    task.taskTitle.toLowerCase().includes(text) ||
    task.taskDescription.toLowerCase().includes(text) ||
    task.category.toLowerCase().includes(text);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
      {columns.map((column) => {
        const tasksInColumn = employee.tasks
          .map((task, index) => ({ task, index })) // keep the original index
          .filter(({ task }) => task.status === column.status && matches(task));

        return (
          <div key={column.status} className="flex flex-col min-w-0">
            <div className="flex items-center gap-2 mb-3 px-0.5">
              <span className={`h-1.5 w-1.5 rounded-full ${column.dot}`} />
              <h3 className="text-sm font-medium">{column.label}</h3>
              <span className="text-xs text-muted">
                {tasksInColumn.length}
              </span>
            </div>

            <div className="column-scroll flex flex-col gap-3 max-h-[65vh] overflow-y-auto pr-1">
              {tasksInColumn.length === 0 && (
                <div className="text-xs text-muted border border-dashed border-border rounded-lg p-4 text-center">
                  {text ? "No matches" : "No tasks here"}
                </div>
              )}

              {tasksInColumn.map(({ task, index }) => (
                <TaskCard
                  key={index}
                  task={task}
                  taskIndex={index}
                  onUpdateStatus={(taskIndex, newStatus) =>
                    updateTaskStatus(employee.id, taskIndex, newStatus)
                  }
                  onSubmitWork={(taskIndex, file) =>
                    submitTaskWork(employee.id, taskIndex, file)
                  }
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TaskList;
