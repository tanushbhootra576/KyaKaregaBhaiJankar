import { useState } from 'react';
import { X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const HotdogIcon = ({ size = 22 }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* bun outline */}
        <path d="M4 12a6 6 0 0 1 6-6h4a6 6 0 1 1 0 12H10a6 6 0 0 1-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        {/* sausage squiggle */}
        <path d="M6 12c2 0 2-2 4-2s2 2 4 2 2-2 4-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleHamburgerClick = () => setMenuOpen((open) => !open);
    const handleNavClick = () => setMenuOpen(false);

    return (
        <header className="navbar">
            <div className="brand">TaskFlow</div>
            <button
                className={`hamburger${menuOpen ? ' open' : ''}`}
                aria-label="Toggle navigation"
                aria-expanded={menuOpen}
                onClick={handleHamburgerClick}
            >
                {menuOpen ? <X size={22} /> : <HotdogIcon size={22} />}
            </button>
            {/* backdrop for mobile menu - clicking closes menu */}
            <div className={`nav-backdrop ${menuOpen ? 'visible' : ''}`} onClick={handleNavClick} />
            <nav className={menuOpen ? 'open' : ''}>
                <NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Home</NavLink>
                <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Tasks</NavLink>
                <NavLink to="/board" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Board</NavLink>
                <NavLink to="/calendar" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Calendar</NavLink>
                <NavLink to="/analytics" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Analytics</NavLink>
                <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''} onClick={handleNavClick}>Settings</NavLink>
            </nav>
        </header>
    );
}
