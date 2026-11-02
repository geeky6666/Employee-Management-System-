import React, { useState } from "react";
import { LayoutDashboard, ListTodo, Users2 } from "lucide-react";
import Sidebar from "../other/Sidebar";
import AdminOverview from "../other/AdminOverview";
import CreateTask from "../other/CreateTask";
import AllTask from "../other/AllTask";
import ReviewSubmissions from "../other/ReviewSubmissions";
import TeamDirectory from "../other/TeamDirectory";
import { getStats } from "../../utils/stats";

// What the admin sees after logging in. Three views, switched from the sidebar:
//   Overview -> numbers and charts
//   Tasks    -> assign tasks, review submitted PDFs
//   Team     -> add employees, manage salaries and profiles
const titles = {
  overview: { title: "Overview", text: "A quick look at how your team is doing." },
  tasks: { title: "Tasks", text: "Assign work and review what has been submitted." },
  team: { title: "Team", text: "Manage employees, salaries and profiles." },
};

const AdminDashboard = ({ employees, addTask, reviewTask, addEmployee, updateSalary, onLogout }) => {
  const [activeView, setActiveView] = useState("overview");
  const stats = getStats(employees);

  const navItems = [
    { key: "overview", label: "Overview", icon: LayoutDashboard },
    { key: "tasks", label: "Tasks", icon: ListTodo, badge: stats.pendingReviews },
    { key: "team", label: "Team", icon: Users2 },
  ];

  return (
    <div className="min-h-screen bg-bg flex flex-col sm:flex-row">
      <Sidebar
        navItems={navItems}
        activeKey={activeView}
        onSelect={setActiveView}
        userName="Admin"
        userRole="Administrator"
        onLogout={onLogout}
      />

      <main className="flex-1 px-6 sm:px-10 py-8 min-w-0">
        <h1 className="text-2xl font-extrabold tracking-tight mb-1">{titles[activeView].title}</h1>
        <p className="text-sm text-muted mb-6">{titles[activeView].text}</p>

        {/* key= makes the view fade in each time you switch tabs */}
        <div key={activeView} className="animate-fade-up">
          {activeView === "overview" && <AdminOverview employees={employees} goTo={setActiveView} />}

          {activeView === "tasks" && (
            <>
              <ReviewSubmissions employees={employees} reviewTask={reviewTask} />
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,420px)_1fr] gap-5 items-start">
                <CreateTask employees={employees} addTask={addTask} />
                <AllTask employees={employees} />
              </div>
            </>
          )}

          {activeView === "team" && (
            <TeamDirectory employees={employees} addEmployee={addEmployee} updateSalary={updateSalary} />
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
