import { NavLink } from 'react-router-dom';
import './NavBar.css';

export const Navbar = () => {
    return (
        <header className="navbar">
            <div className="brand">KKBJ Tasks</div>
            <nav>
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
                <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''}>Tasks</NavLink>
                <NavLink to="/kanban" className={({ isActive }) => isActive ? 'active' : ''}>Kanban</NavLink>
                <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''}>Calendar</NavLink>
                <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''}>Analytics</NavLink>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>Settings</NavLink>
            </nav>
        </header>
    );
}
