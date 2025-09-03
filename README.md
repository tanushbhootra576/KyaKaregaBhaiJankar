# TaskFlow – Modern Task Manager

A fast, intuitive task manager built with React + Vite. Includes a visual Board, calendar, analytics, and lightweight time tracking.

## Highlights

- Tasks with priority (low/medium/high), tags, and projects
- Visual Board (To Do / Doing / Done)
- Calendar view with due dates and recurring tasks
- Insights (category pie, priority bar) – weekly chart removed
- Start/Stop timers with total time per task
- Pinned tasks and smart sorting (priority/date/pinned)
- Clean, responsive UI with dark mode

## Features

- Task management: add, edit, delete, complete
- Subtasks/checklists with progress
- Search and custom filters
- Estimates and time logs (per task)

## Getting Started

1) Clone the repo
```bash
git clone https://github.com/tanushbhootra576/TaskFlow.git
cd TaskFlow
```

2) Install dependencies
```bash
npm install
```

3) Run in development
```bash
npm run dev
```

4) Build for production
```bash
npm run build
```

5) Preview production build (optional)
```bash
npm run preview
```

Default dev server runs on http://localhost:5173 (Vite default). If you’ve customized the port, follow the CLI output.

## Scripts

- dev: start Vite dev server
- build: create production build
- preview: serve the production build locally

## Tech Stack

- React 19 + React Router
- Vite 7
- Recharts (analytics), date-fns, lucide-react icons
- CSS with theme variables (dark mode supported)

## Notes & Tips

- Board: Drag cards between columns to change status.
- Calendar: Shows upcoming tasks; completed items are hidden to focus on what’s left.
- Analytics: Pie shows by Category (Project). If only one category exists, it falls back to a Priority breakdown so colors are meaningful.
- Timers: Use Start/Stop on a task; total time includes the active run.

## Troubleshooting

- Port in use: stop other dev servers or set a different port (e.g., `vite --port 5175`).
- Empty charts: add a few tasks with different projects/priorities to see variety.
- Date issues: due dates are stored as local dates; ensure browser timezone settings are correct.

## Contributing
Feel free to fork this project, make enhancements, and open pull requests!

### ✨ Developed by Tanush Bhootra
