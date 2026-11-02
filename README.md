# Nexora — Company Website + Employee Management System

**Nexora** is a (fictional) web application studio. This project has two parts:
a public company website, and **Nexora Workspace**, the employee management
product behind the login.

In Workspace, an **Admin** can add employees, assign them tasks,
manage salaries, and review submitted work, while each **Employee**
tracks their own tasks, salary, and leave balance.
Built with React + Vite + Tailwind CSS.

This version has been kept simple for a college project presentation:
plain `useState` instead of the Context API, one task-status field
instead of several booleans, and small reusable components. Every file
has comments explaining what it does.

## How to run it

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal (usually http://localhost:5173).

## Test logins

- **Admin:** `surya@gmail.com` / `123`
- **Employees** (all password `123`): `aman@gmail.com`, `abhay@gmail.com`, `naman@gmail.com`, `siddharth@gmail.com`, `shivam@gmail.com`
- Or create your own account from the **Sign up** page.

The demo data lives in `src/data/employeesData.js`. Everything on screen (homepage numbers, charts, payroll) is calculated from it.

## Public pages (before login)

- **Homepage** (`components/Home/`) — sticky navbar, hero with an app
  preview, services, the Workspace product, "how we work" steps, stats,
  contact call-to-action and footer. Sections fade in as you scroll
  (`Reveal.jsx`, using the browser's `IntersectionObserver`).
- **Login** and **Sign Up** (`components/Auth/`) — a shared split-screen
  layout (`AuthLayout.jsx`), a reusable input with show/hide password
  (`Field.jsx`), inline error messages instead of `alert()`, loading
  spinners, and on Sign Up: full validation, a password-strength meter,
  and a duplicate-email check. A new account is logged in automatically.
  New employees start with a salary of 0 until the admin sets it.
- `App.jsx` keeps a `page` value (`"home"`, `"login"` or `"signup"`) and
  shows the matching page while nobody is logged in. Logging out returns
  to the homepage.
- **Rename the company in one place:** edit `src/brand.js` (name, tagline,
  services, steps, stats). The homepage, auth pages and sidebar all read
  from it.

## Features

**Employee side (sidebar: Board / Profile)**
- **Board** — a 5-column Kanban board of their tasks: New → Active →
  Submitted → Completed / Failed.
- Accept a task, then upload a PDF as proof of work to submit it for review.
- **Profile** — their designation, monthly salary, and leave balance
  (annual total used + remaining this month), with an "Apply for a day
  of leave" button.

**Admin side (sidebar: Tasks / Team)**
- **Tasks** — assign a new task to any employee, review submitted PDFs
  and Approve/Reject them, and see each employee's task progress.
- **Team** — add a new employee (name, email, password, designation,
  salary), edit any employee's salary inline, and expand a card to see
  their email, task completion count, and leave balance.

## Work-submission & approval flow

A task moves through 5 statuses:

```
new --(employee accepts)--> active --(employee uploads a PDF)--> submitted
submitted --(admin approves)--> completed
submitted --(admin rejects)--> failed
```

- On the **Active** column, an employee picks a PDF file and clicks
  "Submit work for review." This calls `submitTaskWork` in `App.jsx`,
  which stores the file as `task.workFile = { name, url }` and sets
  `status` to `"submitted"`.
- The PDF itself is turned into a temporary link with
  `URL.createObjectURL(file)` — a plain browser API, no backend or
  database needed. The file is only viewable during this browser session.
- The admin's **"Submissions to review"** panel (`ReviewSubmissions.jsx`)
  lists every task, from every employee, that is currently `"submitted"`,
  with a link to open the PDF and **Approve** / **Reject** buttons. These
  call `reviewTask`, which sets the task's status to `"completed"` or
  `"failed"`.
- Because every employee shares the same `employees` state in `App.jsx`,
  the moment the admin approves or rejects, the employee's own board
  reflects the new status immediately.

## Salary & leave

- Each employee has a `salary` (monthly, in ₹) and a `leaves` object:
  `totalPerYear`, `takenThisYear`, `monthlyQuota`, `takenThisMonth`.
  "Remaining" numbers are never stored — they're always calculated as
  `quota - taken`, so they can't go out of sync.
- `requestLeave(employeeId)` in `App.jsx` adds one day to both the
  yearly and monthly "taken" counts, after checking neither limit has
  already been reached.
- `updateSalary(employeeId, newSalary)` lets the admin edit a salary
  inline from the Team tab.
- `addEmployee(newEmployeeInfo)` creates a new employee with an
  auto-generated id, an empty `tasks` array, and default leave settings
  (24 days/year, 2/month).

## Interactive features

- **Homepage:** a headline word that rotates, a live team demo (click an employee to see
  their real tasks, salary and leave), animated count-up numbers calculated from the data,
  a 4-tab product explorer (with a try-it approve/reject demo) and an FAQ accordion.
- **Admin Overview:** stat cards, a tasks-by-status chart, a salary chart, monthly leave
  tracker, and a badge on the sidebar showing how many submissions need review.
- **Admin Team:** search by name/role/email, sort by name or salary, inline salary edit.
- **Employee Board:** stat cards, task search, and a time-aware greeting.
- **Employee Profile:** leave shown as progress rings; the leave button blocks itself when
  the monthly or yearly limit is reached.
- **Toast messages** confirm every action (task assigned, work approved, leave applied...).
  `App.jsx` owns them through a `notify()` function.
- `utils/stats.js` does all the number-crunching, `hooks/useCountUp.js` does the counting
  animation, and `utils/status.js` holds the status colours, so each idea lives in one place.

## Design

The UI uses a light theme with a deep teal accent and consistent status colours.
Typography is **Plus Jakarta Sans** (headings and text) with **JetBrains Mono** for numbers
such as salary, dates and counters. Both fonts are installed through npm
(`@fontsource-variable/...`) and imported in `src/index.css`, so they work offline.
Colours and fonts are defined once in `tailwind.config.js`; components just use class names
like `bg-accent` or `text-status-failed`. Icons come from `lucide-react`.

## Project structure

```
src/
  data/
    employeesData.js        # starting "database" — 5 employees, tasks, salary, leaves
  brand.js                  # company name, tagline, services, FAQ (edit here to rebrand)
  hooks/useCountUp.js       # animated counting numbers
  utils/stats.js            # totals and percentages calculated from the data
  utils/status.js           # label + colours for each task status
  components/
    Home/
      HomePage.jsx           # stacks the sections below
      Navbar.jsx  Hero.jsx  LiveDemo.jsx  NumbersBand.jsx  Services.jsx
      ProductExplorer.jsx  Process.jsx  Faq.jsx  CallToAction.jsx  Footer.jsx
      Reveal.jsx             # fade-in-on-scroll wrapper
    Auth/
      AuthLayout.jsx         # split-screen shell for login & sign up
      Field.jsx              # input with label, error text, show/hide password
      Login.jsx              # login form (used by both admin & employees)
      SignUp.jsx             # employee sign up with validation
    Dashboard/
      AdminDashboard.jsx      # admin shell: sidebar + Tasks/Team views
      EmployeeDashboard.jsx   # employee shell: sidebar + Board/Profile views
    TaskList/
      TaskCard.jsx            # one task card (controls change by status)
      TaskList.jsx            # the 5-column Kanban board
    other/
      Sidebar.jsx              # shared navigation (top bar on phones)
      ToastStack.jsx           # pop-up confirmation messages
      StatCard.jsx             # number card with count-up animation
      AdminOverview.jsx        # admin home: stats and charts
      CreateTask.jsx           # admin's "assign a task" form
      ReviewSubmissions.jsx    # admin's PDF review panel
      AllTask.jsx              # admin's per-employee task-progress bars
      TaskListNumbers.jsx      # employee's stacked progress bar
      EmployeeProfile.jsx      # employee's own salary + leave view
      TeamDirectory.jsx        # admin's employee list + "Add employee"
      EmployeeCard.jsx         # one employee row (salary edit, expand for detail)
      AddEmployeeForm.jsx      # form to create a new employee
  App.jsx                    # holds ALL the data & login state, the "brain"
  main.jsx                   # starting point, renders <App />
```

## How the data flows (important for your viva)

- **`App.jsx`** is the single source of truth. It stores:
  - `employees` — the array of all employees, their tasks, salary, and leaves
  - `loggedInUser` — who is currently logged in
  - `page` — which public page to show (home / login / signup)
- Every other component receives data through **props** and calls
  functions (also passed as props) whenever something needs to change.
  This pattern is called **"lifting state up"** — one of the most
  fundamental ideas in React.
- Each task has one `status` field instead of several true/false flags,
  so a task can never end up in two contradictory states.

## Notes

- Data lives only in memory (React state) while the app is running — it
  resets if you refresh the page. That keeps the code simple and is
  fine for a demo.
#   E m p l o y e e - M a n a g e m e n t - S y s t e m -  
 #   E m p l o y e e - M a n a g e m e n t - S y s t e m -  
 