import { useMemo, useState } from 'react';
import { useTodos } from '../hooks/useTodos';
import {
    format,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    addDays,
    addMonths,
    isSameMonth,
    isSameDay,
    isToday
} from 'date-fns';
import './pages.css';

export const CalendarPage = () => {
    const { todos } = useTodos();
    const [current, setCurrent] = useState(new Date());

    const monthMatrix = useMemo(() => {
        const startMonth = startOfMonth(current);
        const endMonthDt = endOfMonth(current);
        const startDate = startOfWeek(startMonth, { weekStartsOn: 1 }); // Monday
        const endDate = endOfWeek(endMonthDt, { weekStartsOn: 1 });
        const days = [];
        let day = startDate;
        while (day <= endDate) {
            days.push(day);
            day = addDays(day, 1);
        }
        return days;
    }, [current]);

    const tasksByDay = useMemo(() => {
        const map = new Map();
        todos.filter(t => t.dueDate).forEach(t => {
            const d = new Date(t.dueDate);
            const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; // local date key
            if (!map.has(key)) map.set(key, []);
            map.get(key).push(t);
        });
        return map;
    }, [todos]);

    const headerDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    return (
        <section className="page">

            <div className="card">
                <div className="cal-header">
                    <button onClick={() => setCurrent(addMonths(current, -1))}>◀</button>
                    <h3>{format(current, 'MMMM yyyy')}</h3>
                    <button onClick={() => setCurrent(addMonths(current, 1))}>▶</button>
                </div>
                <div className="cal-grid cal-grid-header">
                    {headerDays.map(d => <div key={d} className="cal-cell cal-head">{d}</div>)}
                </div>
                <div className="cal-grid">
                    {monthMatrix.map((day, idx) => {
                        const key = format(day, 'yyyy-MM-dd');
                        const list = tasksByDay.get(key) || [];
                        const otherMonth = !isSameMonth(day, current);
                        const today = isToday(day);
                        return (
                            <div key={idx} className={`cal-cell ${otherMonth ? 'muted' : ''} ${today ? 'today' : ''}`}>
                                <div className="cal-date">{format(day, 'd')}</div>
                                <div className="cal-tasks">
                                    {list.slice(0, 3).map(t => (
                                        <div key={t.id} className={`cal-task ${t.priority}`}>{t.title}</div>
                                    ))}
                                    {list.length > 3 && (
                                        <div className="cal-more">+{list.length - 3} more</div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
