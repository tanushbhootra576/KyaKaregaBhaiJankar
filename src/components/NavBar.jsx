import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHamburgerClick = () => setMenuOpen((open) => !open);
    const handleNavClick = () => setMenuOpen(false);

    return (
        <header className="navbar">
            <div className="brand">TaskFlow</div>
            <button className={`hamburger${menuOpen ? ' open' : ''}`} aria-label="Toggle navigation" onClick={handleHamburgerClick}>
                <span />
                <span />
                <span />
            </button>
            <nav className={menuOpen ? 'open' : ''}>
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Home</NavLink>
                <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Tasks</NavLink>
                <NavLink to="/kanban" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Kanban</NavLink>
                <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Calendar</NavLink>
                <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Analytics</NavLink>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Settings</NavLink>
            </nav>
        </header>
    );
}
