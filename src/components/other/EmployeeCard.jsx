import React, { useState } from "react";
import { ChevronDown, Pencil, Check, X } from "lucide-react";

const avatarColors = ["bg-status-new", "bg-status-completed", "bg-gold", "bg-status-submitted", "bg-status-active"];

// One row in the admin's Team directory: avatar, name, salary
// (editable), leave summary, and an expandable section with more
// detail -- this doubles as the employee's "profile" as seen by the admin.
// employee     -> one employee object
// colorIndex   -> used to vary the avatar color
// updateSalary -> function from App.jsx: updateSalary(employeeId, newSalary)
const EmployeeCard = ({ employee, colorIndex, updateSalary }) => {
  const [expanded, setExpanded] = useState(false);
  const [editingSalary, setEditingSalary] = useState(false);
  const [salaryDraft, setSalaryDraft] = useState(employee.salary);

  const { totalPerYear, takenThisYear, monthlyQuota, takenThisMonth } =
    employee.leaves;
  const remainingThisMonth = monthlyQuota - takenThisMonth;

  const completedTasks = employee.tasks.filter(
    (t) => t.status === "completed"
  ).length;

  const saveSalary = () => {
    updateSalary(employee.id, salaryDraft);
    setEditingSalary(false);
  };

  return (
    <div className="border border-border rounded-lg p-4">
      <div className="flex items-center gap-3">
        <div
          className={`h-9 w-9 shrink-0 rounded-full ${avatarColors[colorIndex % avatarColors.length]} text-white font-display text-sm font-semibold flex items-center justify-center`}
        >
          {employee.firstName.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-medium truncate">
            {employee.firstName}
          </h3>
          <p className="text-xs text-muted truncate">
            {employee.designation}
          </p>
        </div>

        {/* Salary, editable inline */}
        {editingSalary ? (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-sm">₹</span>
            <input
              type="number"
              value={salaryDraft}
              onChange={(e) => setSalaryDraft(e.target.value)}
              className="w-24 bg-surface-2 border border-accent rounded px-2 py-1 text-sm font-mono outline-none"
              autoFocus
            />
            <button
              onClick={saveSalary}
              className="text-status-completed hover:bg-status-completed/10 rounded p-1"
            >
              <Check size={14} />
            </button>
            <button
              onClick={() => {
                setSalaryDraft(employee.salary);
                setEditingSalary(false);
              }}
              className="text-status-failed hover:bg-status-failed/10 rounded p-1"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-sm">
              ₹{employee.salary.toLocaleString("en-IN")}
            </span>
            <button
              onClick={() => setEditingSalary(true)}
              className="text-muted hover:text-accent rounded p-1"
              title="Edit salary"
            >
              <Pencil size={13} />
            </button>
          </div>
        )}

        <button
          onClick={() => setExpanded((prev) => !prev)}
          className={`text-muted hover:text-ink rounded p-1 transition-transform ${expanded ? "rotate-180" : ""}`}
        >
          <ChevronDown size={16} />
        </button>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-border grid grid-cols-3 gap-3">
          <div className="bg-surface-2 rounded-md p-3">
            <p className="text-[11px] text-muted mb-1">Email</p>
            <p className="text-xs truncate">{employee.email}</p>
          </div>
          <div className="bg-surface-2 rounded-md p-3">
            <p className="text-[11px] text-muted mb-1">Tasks completed</p>
            <p className="font-mono text-sm">
              {completedTasks} / {employee.tasks.length}
            </p>
          </div>
          <div className="bg-surface-2 rounded-md p-3">
            <p className="text-[11px] text-muted mb-1">Leave this year</p>
            <p className="font-mono text-sm">
              {takenThisYear} / {totalPerYear} used · {remainingThisMonth} left this month
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeCard;
