import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import { Navbar } from './components/NavBar'
import { LandingPage } from './pages/LandingPage'
import { TasksPage } from './pages/TasksPage'
import { KanbanPage } from './pages/KanbanPage'
import { CalendarPage } from './pages/CalendarPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SettingsPage } from './pages/SettingsPage'

function App() {
    return (
        <div className="app">
            <Navbar />
            <main className="content">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/tasks" element={<TasksPage />} />
                    <Route path="/kanban" element={<KanbanPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/analytics" element={<AnalyticsPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>
        </div>
    )
}

export default App
