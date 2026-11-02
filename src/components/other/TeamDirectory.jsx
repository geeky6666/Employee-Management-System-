import React, { useState } from "react";
import { UserPlus, Search } from "lucide-react";
import EmployeeCard from "./EmployeeCard";
import AddEmployeeForm from "./AddEmployeeForm";

// The admin's Team tab: search, sort, and a button to add a new employee.
// employees    -> list of all employees
// addEmployee  -> function from App.jsx
// updateSalary -> function from App.jsx
const TeamDirectory = ({ employees, addEmployee, updateSalary }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name"); // "name" | "salary"

  // 1) keep only people whose name, role or email matches the search
  const text = query.trim().toLowerCase();
  const visible = employees.filter(
    (emp) =>
      emp.firstName.toLowerCase().includes(text) ||
      emp.designation.toLowerCase().includes(text) ||
      emp.email.toLowerCase().includes(text)
  );

  // 2) sort the result
  const sorted = [...visible].sort((a, b) =>
    sortBy === "salary" ? b.salary - a.salary : a.firstName.localeCompare(b.firstName)
  );

  return (
    <div className="bg-surface border border-border rounded-xl p-6">
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <h2 className="font-bold text-base mr-auto">
          Team <span className="text-muted font-medium text-sm">({sorted.length})</span>
        </h2>

        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name or role"
            className="w-52 bg-surface-2 border border-border focus:border-accent focus:ring-2 focus:ring-accent/15 outline-none rounded-lg pl-9 pr-3 py-2 text-sm transition-all"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="bg-surface-2 border border-border rounded-lg px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="name">Sort: Name</option>
          <option value="salary">Sort: Salary</option>
        </select>

        {!showAddForm && (
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 bg-accent hover:bg-accent-hover text-white text-sm font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <UserPlus size={15} /> Add employee
          </button>
        )}
      </div>

      {showAddForm && (
        <AddEmployeeForm addEmployee={addEmployee} onDone={() => setShowAddForm(false)} />
      )}

      <div className="flex flex-col gap-3">
        {sorted.map((employee, index) => (
          <EmployeeCard key={employee.id} employee={employee} colorIndex={index} updateSalary={updateSalary} />
        ))}
        {sorted.length === 0 && (
          <p className="text-sm text-muted text-center border border-dashed border-border rounded-lg py-8">
            No one matches "{query}".
          </p>
        )}
      </div>
    </div>
  );
};

export default TeamDirectory;
