import { useEffect, useMemo, useState } from 'react';
import { Pin, PinOff, Trash2, AlertTriangle } from 'lucide-react';
import '../styles/TodoItem.css';

export const TodoItem = ({
    todo,
    onToggle,
    onDelete,
    onTogglePin,
    onUpdatePriority,
    onAddSubTask,
    onUpdateStatus,
    onAddTags,
    onSetProject,
    onStartTimer,
    onStopTimer,
    totalTimeMs,
    onToggleSubTask,
    onUpdateDueDate,
    onUpdateEstimate,
}) => {
    const [newSubTask, setNewSubTask] = useState('');
    const [tagInput, setTagInput] = useState('');
    const msToMinutes = (ms) => Math.round(ms / 60000);
    const [tick, setTick] = useState(0);
   
    useEffect(() => {
        const i = setInterval(() => setTick(t => t + 1), 30000);
        return () => clearInterval(i);
    }, []);

    
    const toDate = (v) => {
        if (!v) return null;
        return v instanceof Date ? v : new Date(v);
    };
    const pad = (n) => String(n).padStart(2, '0');
    const inputValue = useMemo(() => {
        const d = toDate(todo.dueDate);
        if (!d) return '';
        const y = d.getFullYear();
        const m = pad(d.getMonth() + 1);
        const day = pad(d.getDate());
        return `${y}-${m}-${day}`; 
    }, [todo.dueDate]);
    const labelValue = useMemo(() => {
        const d = toDate(todo.dueDate);
        if (!d) return '';
       
        return d.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' });
    }, [todo.dueDate]);
    const running = useMemo(() => (todo.timeLogs || []).some(l => !l.stoppedAt), [todo.timeLogs]);

    const handleSubmitSubTask = (e) => {
        e.preventDefault();
        if (newSubTask.trim()) {
            onAddSubTask(todo.id, newSubTask);
            setNewSubTask('');
        }
    };

    const overdue = todo.dueDate && !todo.completed && new Date(todo.dueDate) < new Date();

    return (
        <div className={`todo-item ${todo.pinned ? 'pinned' : ''}`} data-priority={todo.priority}>
            <div className="todo-header">
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => onToggle(todo.id)}
                />
                <span className={`todo-title ${todo.completed ? 'completed' : ''}`}>
                    {todo.title}
                </span>
                <div className="todo-actions">
                    <select
                        value={todo.priority}
                        onChange={(e) => onUpdatePriority(todo.id, e.target.value)}
                    >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                    </select>
                    <select value={todo.status || 'todo'} onChange={(e) => onUpdateStatus(todo.id, e.target.value)}>
                        <option value="todo">To Do</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <button onClick={() => onTogglePin(todo.id)} aria-label={todo.pinned ? 'Unpin' : 'Pin'}>
                        {todo.pinned ? <Pin size={18} /> : <PinOff size={18} />}
                    </button>
                    <button onClick={() => onDelete(todo.id)} aria-label="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>

            <div className="meta-row">
                <input placeholder="Project" value={todo.project || ''} onChange={(e) => onSetProject(todo.id, e.target.value)} />
                <input placeholder="Add tags comma separated" value={tagInput} onChange={(e) => setTagInput(e.target.value)} />
                <button onClick={() => { const tags = tagInput.split(',').map(t => t.trim()).filter(Boolean); if (tags.length) { onAddTags(todo.id, tags); setTagInput(''); } }}>Add Tags</button>
            </div>
            {(todo.tags && todo.tags.length > 0) && (
                <div className="tags">{todo.tags.map(t => <span key={t} className="tag">#{t}</span>)}</div>
            )}
            <div className="dates">
                <input
                    type="date"
                    value={inputValue}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (!v) return onUpdateDueDate(todo.id, null);
                        const [y, m, d] = v.split('-').map(Number);
                     
                        onUpdateDueDate(todo.id, new Date(y, m - 1, d));
                    }}
                />
                {todo.dueDate && <span className={`due ${overdue ? 'overdue' : ''}`}>Due: {labelValue}</span>}
                {overdue && (
                    <span className="warn"><AlertTriangle size={14} /> Overdue</span>
                )}
            </div>

            <div className="timer">
                <label>
                    Est:
                    <input type="number" min={0} style={{ width: 60, marginLeft: 4 }} value={todo.estimateMinutes || 0} onChange={(e) => onUpdateEstimate(todo.id, Number(e.target.value))} /> min
                </label>
                <button
                    onClick={() => (running ? onStopTimer(todo.id) : onStartTimer(todo.id))}
                    aria-pressed={running}
                >
                    {running ? 'Stop' : 'Start'}
                </button>
                <span>{msToMinutes(totalTimeMs(todo.id))} min logged</span>
            </div>

            <div className="subtasks">
                {todo.subtasks.map((subtask) => (
                    <div key={subtask.id} className="subtask">
                        <input type="checkbox" checked={subtask.completed} onChange={() => onToggleSubTask(todo.id, subtask.id)} />
                        <span className={subtask.completed ? 'completed' : ''}>
                            {subtask.title}
                        </span>
                    </div>
                ))}
                <form onSubmit={handleSubmitSubTask}>
                    <input
                        type="text"
                        value={newSubTask}
                        onChange={(e) => setNewSubTask(e.target.value)}
                        placeholder="Add a subtask..."
                    />
                    <button type="submit">Add</button>
                </form>
            </div>
        </div>
    );
};
