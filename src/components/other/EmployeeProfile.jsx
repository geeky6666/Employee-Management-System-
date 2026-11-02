import React from "react";
import { CalendarDays, IndianRupee, Briefcase, Mail } from "lucide-react";
import { rupees } from "../../utils/stats";

// A circular progress ring drawn with SVG. `value` and `max` decide how
// full it is. The number in the middle is the "remaining" count.
const Ring = ({ value, max, label, size = 112 }) => {
  const stroke = 9;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const fraction = max === 0 ? 0 : value / max;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke} className="stroke-border" />
          <circle
            cx={size / 2} cy={size / 2} r={radius} fill="none" strokeWidth={stroke}
            strokeLinecap="round"
            className="stroke-accent transition-all duration-700"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - fraction)}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-mono text-2xl font-medium">{value}</span>
          <span className="text-[11px] text-muted">of {max}</span>
        </div>
      </div>
      <p className="text-sm font-semibold mt-3">{label}</p>
    </div>
  );
};

// The employee's own profile: details, salary and leave balance.
// employee     -> the logged-in employee
// requestLeave -> function from App.jsx: requestLeave(employeeId)
const EmployeeProfile = ({ employee, requestLeave }) => {
  const { totalPerYear, takenThisYear, monthlyQuota, takenThisMonth } = employee.leaves;
  const remainingYear = totalPerYear - takenThisYear;
  const remainingMonth = monthlyQuota - takenThisMonth;

  return (
    <div className="grid lg:grid-cols-2 gap-5 max-w-4xl">
      {/* identity + salary */}
      <div className="flex flex-col gap-5">
        <div className="bg-surface border border-border rounded-xl p-6 flex items-center gap-4">
          <div className="h-16 w-16 shrink-0 rounded-full bg-accent text-white font-extrabold text-2xl flex items-center justify-center">
            {employee.firstName.charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-extrabold truncate">{employee.firstName}</h2>
            <p className="text-sm text-muted flex items-center gap-1.5 mt-0.5"><Briefcase size={14} /> {employee.designation}</p>
            <p className="text-sm text-muted flex items-center gap-1.5 truncate"><Mail size={14} /> {employee.email}</p>
          </div>
        </div>

        <div className="bg-surface border border-border rounded-xl p-6">
          <h3 className="text-sm font-semibold text-muted mb-2 flex items-center gap-1.5">
            <IndianRupee size={14} /> Salary
          </h3>
          {employee.salary > 0 ? (
            <>
              <p className="font-mono text-3xl font-medium">{rupees(employee.salary)}</p>
              <p className="text-xs text-muted mt-1">per month</p>
              <div className="mt-4 pt-4 border-t border-border flex justify-between text-sm">
                <span className="text-muted">Per year</span>
                <span className="font-mono font-medium">{rupees(employee.salary * 12)}</span>
              </div>
            </>
          ) : (
            <p className="text-sm text-muted">Not set yet. Your admin will add your salary soon.</p>
          )}
        </div>
      </div>

      {/* leave */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h3 className="text-sm font-semibold text-muted mb-6 flex items-center gap-1.5">
          <CalendarDays size={14} /> Leave balance
        </h3>

        <div className="flex justify-around mb-6">
          <Ring value={remainingYear} max={totalPerYear} label="Left this year" />
          <Ring value={remainingMonth} max={monthlyQuota} label="Left this month" />
        </div>

        <button
          onClick={() => requestLeave(employee.id)}
          disabled={remainingMonth <= 0 || remainingYear <= 0}
          className="w-full bg-accent hover:bg-accent-hover active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm py-3 rounded-lg transition-all"
        >
          {remainingMonth <= 0 ? "No leave left this month" : "Apply for a day of leave"}
        </button>
      </div>
    </div>
  );
};

export default EmployeeProfile;
