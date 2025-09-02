import { useState } from 'react';
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
                    <button onClick={() => onTogglePin(todo.id)}>
                        {todo.pinned ? '📌' : '📍'}
                    </button>
                    <button onClick={() => onDelete(todo.id)}>🗑️</button>
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
                    value={todo.dueDate ? `${new Date(todo.dueDate).getFullYear()}-${String(new Date(todo.dueDate).getMonth() + 1).padStart(2, '0')}-${String(new Date(todo.dueDate).getDate()).padStart(2, '0')}` : ''}
                    onChange={(e) => {
                        const v = e.target.value;
                        if (!v) return onUpdateDueDate(todo.id, null);
                        const [y, m, d] = v.split('-').map(Number);
                        onUpdateDueDate(todo.id, new Date(y, m - 1, d));
                    }}
                />
                {todo.dueDate && <span className={`due ${overdue ? 'overdue' : ''}`}>Due: {new Date(todo.dueDate).toLocaleDateString()}</span>}
                {overdue && <span className="warn">⚠ Overdue</span>}
            </div>

            <div className="timer">
                <label>
                    Est:
                    <input type="number" min={0} style={{ width: 60, marginLeft: 4 }} value={todo.estimateMinutes || 0} onChange={(e) => onUpdateEstimate(todo.id, Number(e.target.value))} /> min
                </label>
                <button onClick={() => onStartTimer(todo.id)}>Start</button>
                <button onClick={() => onStopTimer(todo.id)}>Stop</button>
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
