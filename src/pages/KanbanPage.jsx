import { useMemo } from 'react';
import { useTodos } from '../hooks/useTodos';
import './pages.css';

export const KanbanPage = () => {
    const { todos, updateStatus } = useTodos();

    const columns = useMemo(() => ({
        todo: todos.filter(t => (t.status || 'todo') === 'todo'),
        doing: todos.filter(t => (t.status || 'todo') === 'doing'),
        done: todos.filter(t => (t.status || 'todo') === 'done'),
    }), [todos]);

    const onDrop = (e, status) => {
        const id = e.dataTransfer.getData('text/plain');
        if (id) updateStatus(id, status);
    };

    return (
        <section className="page">
            <div className="page-header"><h2>Kanban</h2></div>
            <div className="kanban">
                {(['todo', 'doing', 'done']).map(col => (
                    <div key={col} className="kanban-col" onDragOver={(e) => e.preventDefault()} onDrop={(e) => onDrop(e, col)}>
                        <h3>{col === 'todo' ? 'To Do' : col === 'doing' ? 'Doing' : 'Done'}</h3>
                        {columns[col].map(card => (
                            <div key={card.id} className="kanban-card" draggable onDragStart={(e) => e.dataTransfer.setData('text/plain', card.id)}>
                                <div className="title">{card.title}</div>
                                {card.project && <div className="meta">{card.project}</div>}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </section>
    );
}
