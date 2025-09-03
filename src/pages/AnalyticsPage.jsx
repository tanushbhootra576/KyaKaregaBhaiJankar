import { useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import './pages.css';

export const AnalyticsPage = () => {
    const { todos } = useTodos();

    // Weekly analytics removed per request

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

    // Fallback: if only one category, show priority breakdown so the pie isn't single-colored
    const pieSource = byCategory.length > 1
        ? { title: 'By Category', data: byCategory }
        : { title: 'By Priority', data: byPriority };

    return (
        <section className="page">

            <div className="grid-2">
                {/* Weekly chart removed */}
                <div className="card">
                    <h3>{pieSource.title}</h3>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie dataKey="value" data={pieSource.data} outerRadius={100} label>
                                {pieSource.data.map((entry, index) => (
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
