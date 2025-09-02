import { createContext, useContext, useState } from 'react';

const themes = {
    light: {
        background: '#f5f5f5',
        surface: '#ffffff',
        primary: '#4caf50',
        secondary: '#2196f3',
        text: '#333333',
        textLight: '#666666',
        border: '#e0e0e0',
        error: '#f44336',
        success: '#4caf50',
        warning: '#ff9800',
        priority: {
            high: '#f44336',
            medium: '#ff9800',
            low: '#4caf50',
        }
    },
    dark: {
        background: '#121212',
        surface: '#1e1e1e',
        primary: '#81c784',
        secondary: '#64b5f6',
        text: '#ffffff',
        textLight: '#b0b0b0',
        border: '#333333',
        error: '#e57373',
        success: '#81c784',
        warning: '#ffb74d',
        priority: {
            high: '#e57373',
            medium: '#ffb74d',
            low: '#81c784',
        }
    },
    
};

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    const toggleTheme = (newTheme) => {
        setTheme(newTheme);
        document.body.setAttribute('data-theme', newTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, colors: themes[theme] }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
