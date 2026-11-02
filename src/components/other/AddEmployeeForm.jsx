import React, { useState } from "react";

// Form the admin fills in to add a brand new employee.
// addEmployee -> function from App.jsx that creates the employee
// onDone      -> called after a successful submit, so the parent can
//                close/hide this form
const AddEmployeeForm = ({ addEmployee, onDone }) => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [designation, setDesignation] = useState("");
  const [salary, setSalary] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    addEmployee({ firstName, email, password, designation, salary });

    setFirstName("");
    setEmail("");
    setPassword("");
    setDesignation("");
    setSalary("");
    onDone();
  };

  const inputClasses =
    "w-full bg-surface-2 border border-border focus:border-accent outline-none rounded-md px-3.5 py-2.5 text-sm placeholder:text-muted transition-colors";
  const labelClasses = "block text-xs text-muted mb-1.5";

  return (
    <form
      onSubmit={submitHandler}
      className="bg-surface-2/60 border border-dashed border-border rounded-lg p-5 mb-5"
    >
      <h3 className="text-sm font-medium mb-4">Add a new employee</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClasses}>Full name</label>
          <input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            className={inputClasses}
            type="text"
            placeholder="Meera Shah"
          />
        </div>
        <div>
          <label className={labelClasses}>Designation</label>
          <input
            value={designation}
            onChange={(e) => setDesignation(e.target.value)}
            required
            className={inputClasses}
            type="text"
            placeholder="UI Designer"
          />
        </div>
        <div>
          <label className={labelClasses}>Email (used to log in)</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={inputClasses}
            type="email"
            placeholder="meera@example.com"
          />
        </div>
        <div>
          <label className={labelClasses}>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={inputClasses}
            type="text"
            placeholder="Temporary password"
          />
        </div>
        <div>
          <label className={labelClasses}>Monthly salary (₹)</label>
          <input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
            min="0"
            className={inputClasses}
            type="number"
            placeholder="40000"
          />
        </div>
      </div>

      <div className="flex gap-3">
        <button className="bg-accent hover:bg-accent-hover text-white font-medium text-sm px-4 py-2 rounded-md transition-colors">
          Add employee
        </button>
        <button
          type="button"
          onClick={onDone}
          className="text-sm font-medium text-muted hover:text-ink px-4 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddEmployeeForm;
