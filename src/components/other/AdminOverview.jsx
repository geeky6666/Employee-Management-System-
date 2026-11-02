import React from "react";
import { Users, ClipboardList, Wallet, FileClock, ArrowRight } from "lucide-react";
import StatCard from "./StatCard";
import { getStats, rupees, taskCounts } from "../../utils/stats";
import { statusMeta, statusOrder } from "../../utils/status";

// The admin's home screen: big numbers, a status chart and a payroll chart.
// employees -> all employees
// goTo      -> switches the admin to another tab, e.g. goTo("tasks")
const AdminOverview = ({ employees, goTo }) => {
  const stats = getStats(employees);

  // tasks per status across the whole company
  const statusTotals = statusOrder.map((status) => ({
    status,
    count: employees.reduce((sum, emp) => sum + taskCounts(emp)[status], 0),
  }));

  // employees sorted from highest to lowest salary
  const bySalary = [...employees].sort((a, b) => b.salary - a.salary);
  const topSalary = Math.max(...employees.map((e) => e.salary), 1);

  return (
    <div className="flex flex-col gap-5">
      {/* big numbers */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Employees" target={stats.employeeCount} hint="On the team" tone="blue" onClick={() => goTo("team")} />
        <StatCard icon={ClipboardList} label="Total tasks" target={stats.taskCount} hint={`${stats.activeCount} in progress`} tone="accent" onClick={() => goTo("tasks")} />
        <StatCard icon={FileClock} label="Waiting for review" target={stats.pendingReviews} hint={stats.pendingReviews > 0 ? "Click to review" : "All caught up"} tone="purple" onClick={() => goTo("tasks")} />
        <StatCard icon={Wallet} label="Monthly payroll" target={stats.payroll} format={rupees} hint="All salaries combined" tone="amber" onClick={() => goTo("team")} />
      </div>

      {/* a nudge when there is work to review */}
      {stats.pendingReviews > 0 && (
        <button
          onClick={() => goTo("tasks")}
          className="group flex items-center justify-between gap-3 rounded-xl border border-status-submitted/30 bg-status-submitted/5 px-5 py-4 text-left hover:bg-status-submitted/10 transition-colors animate-fade-up"
        >
          <span className="text-sm font-semibold text-status-submitted">
            {stats.pendingReviews} submission{stats.pendingReviews > 1 ? "s are" : " is"} waiting for your review.
          </span>
          <ArrowRight size={16} className="text-status-submitted group-hover:translate-x-1 transition-transform" />
        </button>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* tasks by status */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-bold mb-1">Tasks by status</h2>
          <p className="text-xs text-muted mb-5">Hover a bar for details.</p>
          <div className="flex items-end gap-3 h-40">
            {statusTotals.map(({ status, count }) => {
              const max = Math.max(...statusTotals.map((s) => s.count), 1);
              const meta = statusMeta[status];
              return (
                <div key={status} className="group flex-1 flex flex-col items-center justify-end h-full" title={`${meta.label}: ${count}`}>
                  <span className="font-mono text-xs mb-1.5 opacity-60 group-hover:opacity-100">{count}</span>
                  <div className={`w-full rounded-t-lg ${meta.dot} group-hover:opacity-80 transition-all duration-500`} style={{ height: `${Math.max((count / max) * 100, 4)}%` }} />
                  <span className={`text-[11px] font-semibold mt-2 ${meta.text}`}>{meta.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* payroll */}
        <div className="bg-surface border border-border rounded-xl p-6">
          <h2 className="font-bold mb-1">Salary by employee</h2>
          <p className="text-xs text-muted mb-5">Highest to lowest.</p>
          <ul className="flex flex-col gap-3">
            {bySalary.map((emp) => (
              <li key={emp.id} className="group">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-semibold">{emp.firstName}</span>
                  <span className="font-mono text-xs text-muted group-hover:text-ink transition-colors">{rupees(emp.salary)}</span>
                </div>
                <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
                  <div className="h-full rounded-full bg-accent group-hover:bg-accent-hover transition-all duration-700" style={{ width: `${(emp.salary / topSalary) * 100}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* leave */}
      <div className="bg-surface border border-border rounded-xl p-6">
        <h2 className="font-bold mb-1">Leave this month</h2>
        <p className="text-xs text-muted mb-5">{stats.leaveTakenThisMonth} leave day{stats.leaveTakenThisMonth === 1 ? "" : "s"} taken across the team.</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {employees.map((emp) => {
            const left = emp.leaves.monthlyQuota - emp.leaves.takenThisMonth;
            return (
              <div key={emp.id} className="rounded-lg border border-border p-3.5">
                <p className="text-sm font-semibold truncate">{emp.firstName}</p>
                <div className="flex gap-1 mt-2.5">
                  {Array.from({ length: emp.leaves.monthlyQuota }).map((_, i) => (
                    <span key={i} className={`h-2 flex-1 rounded-full ${i < emp.leaves.takenThisMonth ? "bg-status-active" : "bg-border"}`} />
                  ))}
                </div>
                <p className="text-[11px] text-muted mt-2">{left} of {emp.leaves.monthlyQuota} left</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
