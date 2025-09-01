import { useState } from 'react';
import { TodoItem } from './TodoItem';
import { useTodos } from '../hooks/useTodos';
import '../styles/TodoList.css';

export const TodoList = () => {
    const {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        addSubTask,
        togglePin,
        updatePriority,
    } = useTodos();

    const [newTodo, setNewTodo] = useState('');
    const [sortBy, setSortBy] = useState('pinned');
    const [searchQuery, setSearchQuery] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            addTodo(newTodo);
            setNewTodo('');
        }
    };

    const sortedAndFilteredTodos = todos
        .filter(todo =>
            todo.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'pinned') {
                if (a.pinned && !b.pinned) return -1;
                if (!a.pinned && b.pinned) return 1;
            }
            if (sortBy === 'priority') {
                const priorityOrder = { high: 0, medium: 1, low: 2 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            }
            if (sortBy === 'createdAt') {
                return b.createdAt.getTime() - a.createdAt.getTime();
            }
            return 0;
        });

    const calculateProgress = () => {
        if (todos.length === 0) return 0;
        const completedTodos = todos.filter(todo => todo.completed).length;
        return (completedTodos / todos.length) * 100;
    };

    return (
        <div className="todo-list-container">
            <div className="todo-header">
                <h1>Todo List</h1>
                <div className="progress-bar">
                    <div
                        className="progress-bar-fill"
                        style={{ width: `${calculateProgress()}%` }}
                    />
                </div>
            </div>

            <div className="todo-controls">
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search todos..."
                    className="search-input"
                />
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="pinned">Sort by Pinned</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="createdAt">Sort by Date</option>
                </select>
            </div>

            <form onSubmit={handleSubmit} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="What needs to be done?"
                    className="todo-input"
                />
                <button type="submit" className="add-button">Add Todo</button>
            </form>

            <div className="todos-wrapper">
                {sortedAndFilteredTodos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                        onTogglePin={togglePin}
                        onUpdatePriority={updatePriority}
                        onAddSubTask={addSubTask}
                    />
                ))}
            </div>
        </div>
    );
};
