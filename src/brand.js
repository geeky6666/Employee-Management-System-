// ------------------------------------------------------------------
// brand.js -- the ONE place where the company name and text live.
// If you ever want to rename the company, change it here and it
// updates on the homepage, login page, sidebar and everywhere else.
// ------------------------------------------------------------------

export const brand = {
  name: "Nexora",
  tagline: "Web apps, built to scale.",
  productName: "Nexora Workspace",
  email: "hello@nexora.dev",
  city: "Gwalior, India",
};

// The services the company offers (shown on the homepage).
export const services = [
  {
    title: "Custom Web Apps",
    text: "Dashboards, portals and internal tools designed around how your team actually works.",
    icon: "LayoutDashboard",
  },
  {
    title: "E-commerce Platforms",
    text: "Fast storefronts with secure checkout, inventory sync and order tracking.",
    icon: "ShoppingBag",
  },
  {
    title: "API & Backend",
    text: "Clean, documented APIs and databases that stay reliable as traffic grows.",
    icon: "ServerCog",
  },
  {
    title: "UI / UX Design",
    text: "Interfaces that feel simple on day one and still make sense at scale.",
    icon: "PenTool",
  },
  {
    title: "Cloud & DevOps",
    text: "Automated deployments, monitoring and backups so releases are never stressful.",
    icon: "Cloud",
  },
  {
    title: "Maintenance & Support",
    text: "Ongoing updates, bug fixes and performance tuning after launch.",
    icon: "LifeBuoy",
  },
];

// How a project moves from idea to launch.
export const processSteps = [
  { title: "Discover", text: "We learn your goals, users and constraints before writing a line of code." },
  { title: "Design", text: "Wireframes and a clickable prototype you can react to early." },
  { title: "Build", text: "Weekly demos while we develop, test and refine." },
  { title: "Launch", text: "Deployment, handover and support once you are live." },
];

export const techStack = ["React", "Node.js", "PostgreSQL", "Tailwind CSS", "AWS", "Docker"];

// Words that rotate in the homepage headline: "...grow with your ____."
export const rotatingWords = ["business", "startup", "team", "campus"];

// Questions shown in the FAQ accordion on the homepage.
export const faqs = [
  {
    q: "What kind of web apps does Nexora build?",
    a: "Dashboards, internal tools, customer portals, e-commerce stores and APIs. If your team works from a browser, we can build it.",
  },
  {
    q: "How long does a typical project take?",
    a: "Most first versions ship in 4 to 8 weeks. You see a working demo every week, so there are no surprises at the end.",
  },
  {
    q: "What is Nexora Workspace?",
    a: "It is our own employee management product: task board, PDF work approvals, salary records and leave tracking. Create a free account or log in to try it. Everything you see on this website is sample content, never real employee data.",
  },
  {
    q: "Is my data safe with Nexora?",
    a: "Yes. Passwords and personal records stay behind a login and are only visible to the people who need them. This public website never shows employee, salary or client information.",
  },
  {
    q: "Do you offer support after launch?",
    a: "Yes. Every project includes a support period, and you can continue with a monthly plan for updates, fixes and monitoring.",
  },
  {
    q: "Which technologies do you use?",
    a: "React and Tailwind CSS on the front end, Node.js and PostgreSQL on the back end, deployed on AWS with Docker.",
  },
];

// Work we are doing right now. These are general descriptions only:
// no client names, no people, no money figures. Replace with your own.
// stage must match a title in processSteps; progress is 0-100.
export const currentWork = [
  { title: "Online store for a local retailer", stage: "Build", progress: 70 },
  { title: "Student attendance portal", stage: "Design", progress: 35 },
  { title: "Delivery tracking dashboard", stage: "Launch", progress: 92 },
  { title: "Clinic appointment booking", stage: "Discover", progress: 12 },
];

// Public case studies shown in the "Our work" section.
export const projects = [
  {
    title: "Retail storefront",
    kind: "E-commerce",
    text: "A fast online store with product search, secure checkout and live stock, so the shop never sells what it does not have.",
    results: ["Checkout in 3 steps", "Stock syncs automatically", "Works on any phone"],
    tech: ["React", "Node.js", "PostgreSQL"],
  },
  {
    title: "Campus attendance portal",
    kind: "Custom web app",
    text: "Teachers mark attendance in seconds and students see their own records. Parents get a simple monthly summary.",
    results: ["Replaces paper registers", "Role-based access", "Monthly summary reports"],
    tech: ["React", "Tailwind CSS", "Node.js"],
  },
  {
    title: "Delivery tracking dashboard",
    kind: "Dashboard & API",
    text: "One screen for every order in transit, with status updates and a clean API that connects to the courier systems.",
    results: ["Live order status", "Documented API", "Automated daily backups"],
    tech: ["Node.js", "AWS", "Docker"],
  },
  {
    title: "Nexora Workspace",
    kind: "Our own product",
    text: "Task board, PDF work approvals and leave tracking for small teams. Private records stay behind a login.",
    results: ["Admin and employee roles", "Approve or reject work", "Leave balance at a glance"],
    tech: ["React", "Tailwind CSS"],
  },
];

// Short, honest numbers taken from the promises above. Edit freely.
export const publicNumbers = [
  { value: "4-8 wks", label: "To a first working version" },
  { value: "Weekly", label: "Demo of progress, every week" },
  { value: "1 day", label: "Typical reply to new enquiries" },
  { value: "6", label: "Services under one roof" },
];
