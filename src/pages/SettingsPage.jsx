import { useTheme } from '../context/ThemeContext';
import './pages.css';

export const SettingsPage = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <section className="page">
          
            <div className="card">
                <label htmlFor="theme">Theme</label>
                <select id="theme" value={theme} onChange={(e) => toggleTheme(e.target.value)}>
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                </select>
            </div>
        </section>
    );
}
