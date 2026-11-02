import React, { useState } from "react";
import { ClipboardPlus } from "lucide-react";

// Form the admin uses to create a new task and assign it to an employee.
// employees -> list of employees, used to fill the "Assign to" dropdown
// addTask   -> function from App.jsx that actually adds the task
const CreateTask = ({ employees, addTask }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    const newTask = {
      taskTitle,
      taskDescription,
      taskDate,
      category,
      status: "new", // every new task starts as "new"
    };

    // assignTo holds the employee's id (as a string, because that is
    // what <select> gives us), so we convert it to a number.
    addTask(Number(assignTo), newTask);

    // clear the form
    setTaskTitle("");
    setTaskDescription("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");
  };

  const inputClasses =
    "w-full bg-surface-2 border border-border focus:border-accent outline-none rounded-md px-3.5 py-2.5 text-sm placeholder:text-muted transition-colors";
  const labelClasses = "block text-xs text-muted mb-1.5";

  return (
    <div className="bg-surface border border-border rounded-lg p-6">
      <h2 className="font-bold text-base mb-5 flex items-center gap-2">
        <ClipboardPlus size={17} className="text-accent" /> Assign a task
      </h2>

      <form onSubmit={submitHandler} className="flex flex-col gap-4">
        <div>
          <label className={labelClasses}>Title</label>
          <input
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            required
            className={inputClasses}
            type="text"
            placeholder="Make a UI design"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className={labelClasses}>Due date</label>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              required
              className={inputClasses}
              type="date"
            />
          </div>
          <div>
            <label className={labelClasses}>Category</label>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className={inputClasses}
              type="text"
              placeholder="Design, Dev..."
            />
          </div>
        </div>

        <div>
          <label className={labelClasses}>Assign to</label>
          <select
            value={assignTo}
            onChange={(e) => setAssignTo(e.target.value)}
            required
            className={inputClasses}
          >
            <option value="" disabled>
              Select an employee
            </option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.firstName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClasses}>Description</label>
          <textarea
            value={taskDescription}
            onChange={(e) => setTaskDescription(e.target.value)}
            required
            rows={4}
            className={`${inputClasses} resize-none`}
          ></textarea>
        </div>

        <button className="bg-accent hover:bg-accent-hover text-white font-semibold text-sm py-2.5 rounded-md transition-colors mt-1">
          Create task
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
