import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ThemeProvider } from './context/ThemeContext'
import { TodosProvider } from './hooks/useTodos'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ThemeProvider>
            <TodosProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </TodosProvider>
        </ThemeProvider>
    </React.StrictMode>
)
