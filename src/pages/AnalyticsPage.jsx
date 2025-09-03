import { useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './pages.css';

export const AnalyticsPage = () => {
    const { todos } = useTodos();

    const weekly = useMemo(() => {
        const map = new Map();
        todos.filter(t => t.completedAt).forEach(t => {
            const d = new Date(t.completedAt);
            const week = Math.ceil((((d - new Date(d.getFullYear(), 0, 1)) / 86400000) + new Date(d.getFullYear(), 0, 1).getDay() + 1) / 7);
            const key = `${d.getFullYear()}-W${week}`;
            map.set(key, (map.get(key) || 0) + 1);
        });
        return Array.from(map, ([name, value]) => ({ name, value }));
    }, [todos]);

    const byCategory = useMemo(() => {
        const map = new Map();
        todos.forEach(t => map.set(t.project || 'General', (map.get(t.project || 'General') || 0) + 1));
        return Array.from(map, ([name, value]) => ({ name, value }));
    }, [todos]);

    const byPriority = useMemo(() => {
        const map = { low: 0, medium: 0, high: 0 };
        todos.forEach(t => map[t.priority]++);
        return Object.entries(map).map(([name, value]) => ({ name, value }));
    }, [todos]);

    const COLORS = ['#34d399', '#60a5fa', '#f43f5e', '#f59e0b', '#a78bfa'];

    return (
        <section className="page">
           
            <div className="analytics-grid">
                <div className="card">
                    <h3>Weekly Completions</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <LineChart data={weekly}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="card">
                    <h3>By Category</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie dataKey="value" data={byCategory} outerRadius={100} label>
                                {byCategory.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="card">
                    <h3>By Priority</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={byPriority}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="value" fill="#10b981" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
