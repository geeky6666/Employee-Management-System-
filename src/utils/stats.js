// Works out useful numbers from the employees data. Both the homepage
// and the admin Overview use this, so every number on screen comes from
// the SAME data -- change a task or salary and everything updates.

export const getStats = (employees) => {
  const allTasks = employees.flatMap((emp) => emp.tasks);
  const countStatus = (status) =>
    allTasks.filter((task) => task.status === status).length;

  const completed = countStatus("completed");
  const failed = countStatus("failed");
  const finished = completed + failed;

  return {
    employeeCount: employees.length,
    taskCount: allTasks.length,
    newCount: countStatus("new"),
    activeCount: countStatus("active"),
    pendingReviews: countStatus("submitted"),
    completed,
    failed,
    // share of finished tasks that were approved (0 when nothing finished yet)
    successRate: finished === 0 ? 0 : Math.round((completed / finished) * 100),
    payroll: employees.reduce((sum, emp) => sum + emp.salary, 0),
    leaveTakenThisMonth: employees.reduce((sum, emp) => sum + emp.leaves.takenThisMonth, 0),
  };
};

// Formats a number as Indian rupees, e.g. 42000 -> "₹42,000"
export const rupees = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

// Counts one employee's tasks by status.
export const taskCounts = (employee) => {
  const count = (status) => employee.tasks.filter((t) => t.status === status).length;
  return {
    new: count("new"),
    active: count("active"),
    submitted: count("submitted"),
    completed: count("completed"),
    failed: count("failed"),
    total: employee.tasks.length,
  };
};
