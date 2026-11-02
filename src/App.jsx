import React, { useRef, useState } from "react";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import ToastStack from "./components/other/ToastStack";
import employeesData, { adminCredentials } from "./data/employeesData";

// ------------------------------------------------------------------
// App.jsx is the "brain" of the whole application.
// It is the ONLY place where the main data lives:
//   - the list of all employees (and their tasks, salary, leaves)
//   - who is currently logged in
//   - which public page is showing (home / login / signup)
//   - the little pop-up messages ("toasts")
//
// Every other component just RECEIVES this data as props and calls
// functions (also passed as props) when it wants something changed.
// This is called "lifting state up" -- no Context API needed.
// ------------------------------------------------------------------

const App = () => {
  // All employees. This is our "database" while the app is running.
  const [employees, setEmployees] = useState(employeesData);

  // null -> nobody logged in | { role: "admin" } | { role: "employee", id: 1 }
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Which public page to show while nobody is logged in.
  const [page, setPage] = useState("home"); // "home" | "login" | "signup"

  // Pop-up messages, e.g. [{ id: 1, message: "Task assigned", type: "success" }]
  const [toasts, setToasts] = useState([]);
  const nextToastId = useRef(1);

  // ---------------- TOASTS ----------------
  const dismissToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  // Shows a message for a few seconds, then removes it automatically.
  const notify = (message, type = "success") => {
    const id = nextToastId.current++;
    setToasts((prev) => [...prev, { id, message, type }].slice(-3)); // keep at most 3 on screen
    setTimeout(() => dismissToast(id), 3800);
  };

  // ---------------- SMALL HELPER ----------------
  // Changes ONE employee and leaves everyone else untouched.
  // changeFn receives the employee and returns the updated employee.
  const updateEmployee = (employeeId, changeFn) => {
    setEmployees((prev) =>
      prev.map((emp) => (emp.id === employeeId ? changeFn(emp) : emp))
    );
  };

  const findEmployee = (employeeId) => employees.find((emp) => emp.id === employeeId);

  // ---------------- LOGIN ----------------
  // Returns { ok: true } or { ok: false, message } so the Login page can
  // show the error inline (no ugly alert() popup).
  const handleLogin = (email, password) => {
    const cleanEmail = email.toLowerCase();

    // 1) Is it the admin?
    if (
      cleanEmail === adminCredentials.email.toLowerCase() &&
      password === adminCredentials.password
    ) {
      setLoggedInUser({ role: "admin" });
      notify("Welcome back, Admin.");
      return { ok: true };
    }

    // 2) Otherwise, is it one of the employees?
    const employee = employees.find(
      (emp) => emp.email.toLowerCase() === cleanEmail && emp.password === password
    );

    if (employee) {
      setLoggedInUser({ role: "employee", id: employee.id });
      notify(`Welcome back, ${employee.firstName}.`);
      return { ok: true };
    }

    return { ok: false, message: "Incorrect email or password. Please try again." };
  };

  // ---------------- SIGN UP ----------------
  // A new person creates an employee account and is logged in straight away.
  const signUp = ({ firstName, email, designation, password }) => {
    const cleanEmail = email.toLowerCase();

    const emailTaken =
      cleanEmail === adminCredentials.email.toLowerCase() ||
      employees.some((emp) => emp.email.toLowerCase() === cleanEmail);

    if (emailTaken) {
      return { ok: false, message: "This email is already registered. Try logging in instead." };
    }

    const nextId = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

    const newEmployee = {
      id: nextId,
      firstName,
      email: cleanEmail,
      password,
      designation,
      salary: 0, // the admin sets the salary later from the Team tab
      leaves: { totalPerYear: 24, takenThisYear: 0, monthlyQuota: 2, takenThisMonth: 0 },
      tasks: [],
    };

    setEmployees((prev) => [...prev, newEmployee]);
    setLoggedInUser({ role: "employee", id: nextId });
    notify(`Account created. Welcome to Nexora, ${firstName}!`);
    return { ok: true };
  };

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    setLoggedInUser(null);
    setPage("home"); // after logging out, show the homepage again
    notify("You have been logged out.", "info");
  };

  // ---------------- ADMIN: CREATE A NEW TASK ----------------
  const addTask = (employeeId, newTask) => {
    updateEmployee(employeeId, (emp) => ({ ...emp, tasks: [...emp.tasks, newTask] }));
    notify(`Task "${newTask.taskTitle}" assigned to ${findEmployee(employeeId).firstName}.`);
  };

  // ---------------- EMPLOYEE: ACCEPT A TASK (new -> active) ----------------
  // taskIndex = position of the task inside that employee's tasks array
  const updateTaskStatus = (employeeId, taskIndex, newStatus) => {
    updateEmployee(employeeId, (emp) => ({
      ...emp,
      tasks: emp.tasks.map((task, idx) =>
        idx === taskIndex ? { ...task, status: newStatus } : task
      ),
    }));
    notify("Task accepted. It is now in your Active column.");
  };

  // ---------------- EMPLOYEE: SUBMIT A PDF AS PROOF OF WORK ----------------
  // Moves the task to "submitted" so the admin can review the PDF.
  const submitTaskWork = (employeeId, taskIndex, file) => {
    // Turn the uploaded file into a temporary link the browser can open.
    const fileUrl = URL.createObjectURL(file);

    updateEmployee(employeeId, (emp) => ({
      ...emp,
      tasks: emp.tasks.map((task, idx) =>
        idx === taskIndex
          ? { ...task, status: "submitted", workFile: { name: file.name, url: fileUrl } }
          : task
      ),
    }));
    notify("Work submitted. Your admin will review it shortly.");
  };

  // ---------------- ADMIN: APPROVE OR REJECT A SUBMITTED PDF ----------------
  // decision is "approved" or "rejected"
  const reviewTask = (employeeId, taskIndex, decision) => {
    const approved = decision === "approved";

    updateEmployee(employeeId, (emp) => ({
      ...emp,
      tasks: emp.tasks.map((task, idx) =>
        idx === taskIndex ? { ...task, status: approved ? "completed" : "failed" } : task
      ),
    }));

    const name = findEmployee(employeeId).firstName;
    notify(
      approved ? `Work approved. ${name}'s task is now completed.` : `Work rejected. ${name}'s task is marked failed.`,
      approved ? "success" : "error"
    );
  };

  // ---------------- ADMIN: ADD A NEW EMPLOYEE ----------------
  const addEmployee = (info) => {
    const nextId = employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;

    setEmployees((prev) => [
      ...prev,
      {
        id: nextId,
        firstName: info.firstName,
        email: info.email.toLowerCase(),
        password: info.password,
        designation: info.designation,
        salary: Number(info.salary),
        leaves: { totalPerYear: 24, takenThisYear: 0, monthlyQuota: 2, takenThisMonth: 0 },
        tasks: [],
      },
    ]);
    notify(`${info.firstName} has been added to the team.`);
  };

  // ---------------- ADMIN: CHANGE AN EMPLOYEE'S SALARY ----------------
  const updateSalary = (employeeId, newSalary) => {
    updateEmployee(employeeId, (emp) => ({ ...emp, salary: Number(newSalary) }));
    notify(`${findEmployee(employeeId).firstName}'s salary updated.`);
  };

  // ---------------- EMPLOYEE: APPLY FOR ONE DAY OF LEAVE ----------------
  const requestLeave = (employeeId) => {
    // We check the limits HERE (not inside the state update) so the
    // message shows exactly once.
    const { totalPerYear, takenThisYear, monthlyQuota, takenThisMonth } =
      findEmployee(employeeId).leaves;

    if (takenThisYear >= totalPerYear) {
      notify("No annual leave balance remaining.", "error");
      return;
    }
    if (takenThisMonth >= monthlyQuota) {
      notify("You have used all your leave for this month.", "error");
      return;
    }

    updateEmployee(employeeId, (emp) => ({
      ...emp,
      leaves: {
        ...emp.leaves,
        takenThisYear: emp.leaves.takenThisYear + 1,
        takenThisMonth: emp.leaves.takenThisMonth + 1,
      },
    }));
    notify("Leave applied for 1 day.");
  };

  // ---------------- WHAT TO SHOW ON SCREEN ----------------
  let screen;

  if (!loggedInUser) {
    if (page === "login") {
      screen = (
        <Login
          handleLogin={handleLogin}
          onSwitch={() => setPage("signup")}
          onBack={() => setPage("home")}
        />
      );
    } else if (page === "signup") {
      screen = (
        <SignUp
          signUp={signUp}
          onSwitch={() => setPage("login")}
          onBack={() => setPage("home")}
        />
      );
    } else {
      screen = (
        <HomePage
          onLogin={() => setPage("login")}
          onSignUp={() => setPage("signup")}
        />
      );
    }
  } else if (loggedInUser.role === "admin") {
    screen = (
      <AdminDashboard
        employees={employees}
        addTask={addTask}
        reviewTask={reviewTask}
        addEmployee={addEmployee}
        updateSalary={updateSalary}
        onLogout={handleLogout}
      />
    );
  } else {
    screen = (
      <EmployeeDashboard
        employee={findEmployee(loggedInUser.id)}
        updateTaskStatus={updateTaskStatus}
        submitTaskWork={submitTaskWork}
        requestLeave={requestLeave}
        onLogout={handleLogout}
      />
    );
  }

  return (
    <>
      {screen}
      <ToastStack toasts={toasts} onDismiss={dismissToast} />
    </>
  );
};

export default App;
