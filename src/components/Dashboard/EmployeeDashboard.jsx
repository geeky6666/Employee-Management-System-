import React, { useState } from "react";
import { LayoutGrid, UserCircle, Search, X, ListChecks, Hourglass, CheckCircle2, Inbox } from "lucide-react";
import Sidebar from "../other/Sidebar";
import StatCard from "../other/StatCard";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";
import EmployeeProfile from "../other/EmployeeProfile";
import { taskCounts } from "../../utils/stats";

// What an employee sees after logging in. Two views from the sidebar:
//   Board   -> their tasks as a Kanban board (with search)
//   Profile -> salary and leave balance
// employee         -> the logged-in employee's data
// updateTaskStatus -> accept a task
// submitTaskWork   -> upload a PDF
// requestLeave     -> apply for a day of leave
const greeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const EmployeeDashboard = ({ employee, updateTaskStatus, submitTaskWork, requestLeave, onLogout }) => {
  const [activeView, setActiveView] = useState("board");
  const [query, setQuery] = useState("");
  const counts = taskCounts(employee);

  const navItems = [
    { key: "board", label: "Board", icon: LayoutGrid, badge: counts.new },
    { key: "profile", label: "Profile", icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col sm:flex-row">
      <Sidebar
        navItems={navItems}
        activeKey={activeView}
        onSelect={setActiveView}
        userName={employee.firstName}
        userRole={employee.designation}
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 sm:px-10 py-8 min-w-0">
        <h1 className="text-2xl font-extrabold tracking-tight mb-1">
          {activeView === "board" ? `${greeting()}, ${employee.firstName}` : "Your profile"}
        </h1>
        <p className="text-sm text-muted mb-6">
          {activeView === "board"
            ? counts.new > 0
              ? `You have ${counts.new} new task${counts.new > 1 ? "s" : ""} waiting for you.`
              : "Here is what is on your plate right now."
            : "Your salary and leave balance."}
        </p>

        <div key={activeView} className="animate-fade-up">
          {activeView === "board" && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Inbox} label="New" target={counts.new} hint="Waiting to be accepted" tone="blue" />
                <StatCard icon={ListChecks} label="In progress" target={counts.active} hint="You are working on" tone="amber" />
                <StatCard icon={Hourglass} label="In review" target={counts.submitted} hint="Waiting for admin" tone="purple" />
                <StatCard icon={CheckCircle2} label="Completed" target={counts.completed} hint="Approved by admin" tone="accent" />
              </div>

              <TaskListNumbers employee={employee} />

              {/* search box */}
              <div className="relative mt-6 max-w-sm">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search your tasks"
                  className="w-full bg-surface border border-border focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none rounded-lg pl-10 pr-9 py-2.5 text-sm transition-all"
                />
                {query && (
                  <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-ink" aria-label="Clear search">
                    <X size={15} />
                  </button>
                )}
              </div>

              <TaskList
                employee={employee}
                updateTaskStatus={updateTaskStatus}
                submitTaskWork={submitTaskWork}
                query={query}
              />
            </>
          )}

          {activeView === "profile" && <EmployeeProfile employee={employee} requestLeave={requestLeave} />}
        </div>
      </main>
    </div>
  );
};

export default EmployeeDashboard;
