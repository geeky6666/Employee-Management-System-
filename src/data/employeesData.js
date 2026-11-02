// This file is our "fake database" of employees and their tasks.
// In a real project this data would come from a server/database, but for
// a college project it is simpler to keep it here as plain JavaScript.
//
// Every task has ONE "status" field:
//   "new"       -> created by the admin, employee has not accepted it yet
//   "active"    -> employee accepted it and is working on it
//   "submitted" -> employee uploaded a PDF as proof, waiting for admin review
//   "completed" -> admin reviewed the PDF and approved it
//   "failed"    -> admin reviewed the PDF and rejected it
//
// "workFile" is null until the employee submits a PDF; after that it is
// { name: "report.pdf", url: "blob:..." }.
//
// "leaves" holds the leave numbers. "Remaining" is never stored -- it is
// always calculated as (allowed - taken), so it can't go out of sync.

const employeesData = [
  {
    id: 1,
    firstName: "Aman",
    email: "aman@gmail.com",
    password: "123",
    designation: "Frontend Developer",
    salary: 42000,
    leaves: { totalPerYear: 24, takenThisYear: 6, monthlyQuota: 2, takenThisMonth: 1 },
    tasks: [
      {
        taskTitle: "Update website",
        taskDescription: "Revamp the homepage design",
        taskDate: "2026-09-12",
        category: "Design",
        status: "new",
        workFile: null,
      },
      {
        taskTitle: "Client meeting",
        taskDescription: "Discuss project requirements",
        taskDate: "2026-09-09",
        category: "Meeting",
        status: "completed",
        workFile: null,
      },
      {
        taskTitle: "Fix bugs",
        taskDescription: "Resolve bugs reported in issue tracker",
        taskDate: "2026-09-14",
        category: "Development",
        status: "active",
        workFile: null,
      },
    ],
  },
  {
    id: 2,
    firstName: "Abhay",
    email: "abhay@gmail.com",
    password: "123",
    designation: "Database Engineer",
    salary: 48000,
    leaves: { totalPerYear: 24, takenThisYear: 3, monthlyQuota: 2, takenThisMonth: 0 },
    tasks: [
      {
        taskTitle: "Database optimization",
        taskDescription: "Optimize queries for better performance",
        taskDate: "2026-09-11",
        category: "Database",
        status: "active",
        workFile: null,
      },
      {
        taskTitle: "Design new feature",
        taskDescription: "Create mockups for the new feature",
        taskDate: "2026-09-09",
        category: "Design",
        status: "completed",
        workFile: null,
      },
    ],
  },
  {
    id: 3,
    firstName: "Naman",
    email: "naman@gmail.com",
    password: "123",
    designation: "QA Engineer",
    salary: 38000,
    leaves: { totalPerYear: 24, takenThisYear: 10, monthlyQuota: 2, takenThisMonth: 2 },
    tasks: [
      {
        taskTitle: "Prepare presentation",
        taskDescription: "Prepare slides for upcoming client presentation",
        taskDate: "2026-09-13",
        category: "Presentation",
        status: "new",
        workFile: null,
      },
      {
        taskTitle: "Code review",
        taskDescription: "Review the codebase for optimization",
        taskDate: "2026-09-12",
        category: "Development",
        status: "active",
        workFile: null,
      },
      {
        taskTitle: "Testing",
        taskDescription: "Test the latest build for bugs",
        taskDate: "2026-09-08",
        category: "QA",
        status: "completed",
        workFile: null,
      },
    ],
  },
  {
    id: 4,
    firstName: "Siddharth",
    email: "siddharth@gmail.com",
    password: "123",
    designation: "Technical Writer",
    salary: 36000,
    leaves: { totalPerYear: 24, takenThisYear: 1, monthlyQuota: 2, takenThisMonth: 0 },
    tasks: [
      {
        taskTitle: "Write documentation",
        taskDescription: "Update the project documentation",
        taskDate: "2026-09-13",
        category: "Documentation",
        status: "new",
        workFile: null,
      },
      {
        taskTitle: "Set up CI/CD",
        taskDescription: "Implement continuous integration pipeline",
        taskDate: "2026-09-11",
        category: "DevOps",
        status: "active",
        workFile: null,
      },
    ],
  },
  {
    id: 5,
    firstName: "Shivam",
    email: "shivam@gmail.com",
    password: "123",
    designation: "DevOps Engineer",
    salary: 50000,
    leaves: { totalPerYear: 24, takenThisYear: 8, monthlyQuota: 2, takenThisMonth: 1 },
    tasks: [
      {
        taskTitle: "UI redesign",
        taskDescription: "Redesign the user interface for better UX",
        taskDate: "2026-09-14",
        category: "Design",
        status: "new",
        workFile: null,
      },
      {
        taskTitle: "Deploy new build",
        taskDescription: "Deploy the latest build to production",
        taskDate: "2026-09-09",
        category: "DevOps",
        status: "completed",
        workFile: null,
      },
      {
        taskTitle: "Client feedback",
        taskDescription: "Gather feedback from clients after product launch",
        taskDate: "2026-09-12",
        category: "Support",
        status: "active",
        workFile: null,
      },
    ],
  },
];

// The one and only admin login.
export const adminCredentials = {
  email: "surya@gmail.com",
  password: "123",
};

export default employeesData;
