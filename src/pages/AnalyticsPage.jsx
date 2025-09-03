import { useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, Legend } from 'recharts';
import './pages.css';

export const AnalyticsPage = () => {
    const { todos } = useTodos();

    // Weekly analytics removed per request

    const byCategory = useMemo(() => {
        const map = new Map();
        todos.forEach(t => {
            const key = (t.project && String(t.project).trim()) || 'General';
            map.set(key, (map.get(key) || 0) + 1);
        });
        return Array.from(map, ([name, value]) => ({ name, value }));
    }, [todos]);

    const byPriority = useMemo(() => {
        const order = ['low', 'medium', 'high', 'unknown'];
        const map = { low: 0, medium: 0, high: 0, unknown: 0 };
        todos.forEach(t => {
            const p = (t.priority === 'low' || t.priority === 'medium' || t.priority === 'high') ? t.priority : 'unknown';
            map[p]++;
        });
        return order
            .map(name => ({ name, value: map[name] }))
            .filter(d => d.value > 0 || (name === 'low' || name === 'medium' || name === 'high'));
    }, [todos]);

    const COLORS = ['#34d399', '#60a5fa', '#f43f5e', '#f59e0b', '#a78bfa'];
    const PRIORITY_COLORS = { low: '#22c55e', medium: '#f59e0b', high: '#ef4444', unknown: '#94a3b8' };

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
                    <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>
                        {pieSource.title === 'By Category' ? 'Counts of tasks grouped by Project' : 'Counts of tasks grouped by Priority'}
                    </div>
                    <ResponsiveContainer width="100%" height={280}>
                        <PieChart>
                            <Pie dataKey="value" data={pieSource.data} outerRadius={100} label>
                                {pieSource.data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={24} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
                <div className="card">
                    <h3>By Priority</h3>
                    <div style={{ color: 'var(--muted)', fontSize: 12, marginBottom: 8 }}>Counts of tasks grouped by Priority</div>
                    <ResponsiveContainer width="100%" height={280}>
                        <BarChart data={byPriority}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            {byPriority.map((d) => (
                                <Bar key={d.name} dataKey="value" fill={PRIORITY_COLORS[d.name] || '#10b981'} />
                            ))}
                            <Legend />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </section>
    );
}
