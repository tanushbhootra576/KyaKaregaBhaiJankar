import { useState } from 'react';
import '../styles/TodoItem.css';

export const TodoItem = ({
    todo,
    onToggle,
    onDelete,
    onTogglePin,
    onUpdatePriority,
    onAddSubTask,
}) => {
    const [newSubTask, setNewSubTask] = useState('');

    const handleSubmitSubTask = (e) => {
        e.preventDefault();
        if (newSubTask.trim()) {
            onAddSubTask(todo.id, newSubTask);
            setNewSubTask('');
        }
    };

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
                    <button onClick={() => onTogglePin(todo.id)}>
                        {todo.pinned ? '📌' : '📍'}
                    </button>
                    <button onClick={() => onDelete(todo.id)}>🗑️</button>
                </div>
            </div>

            <div className="subtasks">
                {todo.subtasks.map((subtask) => (
                    <div key={subtask.id} className="subtask">
                        <input
                            type="checkbox"
                            checked={subtask.completed}
                            onChange={() => {/* Add subtask toggle functionality */ }}
                        />
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
