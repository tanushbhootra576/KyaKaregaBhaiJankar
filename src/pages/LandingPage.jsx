import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import './pages.css';

export const LandingPage = () => {
    return (
        <section className="page landing">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
                <h1 style={{ fontSize: '2.2rem', marginBottom: 8 }}>Organize. Focus. Finish.</h1>
                <p style={{ color: 'var(--muted)' }}>A modern task manager with Kanban, calendar, analytics, and time tracking.</p>
            </motion.div>
            <div className="cta">
                <Link className="btn" to="/tasks">Get Started</Link>
                <Link className="btn ghost" to="/analytics">View Insights</Link>
            </div>
            <div className="features">
                <div>Tags & Projects</div>
                <div>Kanban board</div>
                <div>Calendar with recurring tasks</div>
                <div>Custom filters & saved searches</div>
                <div>Time tracking & estimates</div>
                <div>Insights dashboard</div>
            </div>
            <div style={{ marginTop: 24 }}>
                <h3 style={{ marginBottom: 8 }}>Roadmap</h3>
                <div className="grid-2">
                    <div className="card">
                        <strong>Soon</strong>
                        <ul>
                            <li>Drag to reschedule in Calendar</li>
                            <li>Task attachments</li>
                            <li>Reminders & notifications</li>
                        </ul>
                    </div>
                    <div className="card">
                        <strong>Later</strong>
                        <ul>
                            <li>Team collaboration</li>
                            <li>Templates</li>
                            <li>Export/Import</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
