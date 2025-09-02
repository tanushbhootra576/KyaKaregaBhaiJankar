import { useState, useMemo } from 'react';
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
        updateStatus,
        addTags,
        setProject,
        startTimer,
        stopTimer,
        totalTimeMs,
        toggleSubTask,
        updateDueDate,
        updateEstimate,
    } = useTodos();

    const [newTodo, setNewTodo] = useState('');
    const [newDueDate, setNewDueDate] = useState('');
    const [sortBy, setSortBy] = useState('pinned');
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState({ status: 'all', project: 'all', tag: 'all', overdue: false });
    const [groupBy, setGroupBy] = useState('none'); // none | status | project
    const [savedSearches, setSavedSearches] = useState(() => JSON.parse(localStorage.getItem('savedSearches') || '[]'));

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodo.trim()) {
            let dueDate = null;
            if (newDueDate) {
                const [y, m, d] = newDueDate.split('-').map(Number);
                dueDate = new Date(y, m - 1, d); // local date, avoids timezone drift
            }
            addTodo(newTodo, { dueDate });
            setNewTodo('');
            setNewDueDate('');
        }
    };

    const sortedAndFilteredTodos = todos
        .filter(todo => todo.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .filter(todo => filter.status === 'all' ? true : (todo.status || 'todo') === filter.status)
        .filter(todo => filter.project === 'all' ? true : (todo.project || '') === filter.project)
        .filter(todo => filter.tag === 'all' ? true : (todo.tags || []).includes(filter.tag))
        .filter(todo => !filter.overdue ? true : (todo.dueDate && new Date(todo.dueDate) < new Date() && !todo.completed))
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
                <select value={filter.status} onChange={(e) => setFilter(f => ({ ...f, status: e.target.value }))} className="sort-select">
                    <option value="all">All Statuses</option>
                    <option value="todo">To Do</option>
                    <option value="doing">Doing</option>
                    <option value="done">Done</option>
                </select>
                <select value={filter.project} onChange={(e) => setFilter(f => ({ ...f, project: e.target.value }))} className="sort-select">
                    <option value="all">All Projects</option>
                    {[...new Set(todos.map(t => t.project).filter(Boolean))].map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <select value={filter.tag} onChange={(e) => setFilter(f => ({ ...f, tag: e.target.value }))} className="sort-select">
                    <option value="all">All Tags</option>
                    {[...new Set(todos.flatMap(t => t.tags || []))].map(tag => <option key={tag} value={tag}>{tag}</option>)}
                </select>
                <label className="checkbox">
                    <input type="checkbox" checked={filter.overdue} onChange={(e) => setFilter(f => ({ ...f, overdue: e.target.checked }))} /> Overdue only
                </label>
                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="sort-select"
                >
                    <option value="pinned">Sort by Pinned</option>
                    <option value="priority">Sort by Priority</option>
                    <option value="createdAt">Sort by Date</option>
                </select>
                <select value={groupBy} onChange={(e) => setGroupBy(e.target.value)} className="sort-select">
                    <option value="none">No Grouping</option>
                    <option value="status">Group by Status</option>
                    <option value="project">Group by Project</option>
                </select>
                <button onClick={() => {
                    const entry = { name: prompt('Name this search:'), query: { searchQuery, filter, sortBy } };
                    if (!entry.name) return;
                    const next = [...savedSearches, entry];
                    setSavedSearches(next);
                    localStorage.setItem('savedSearches', JSON.stringify(next));
                }}>Save Search</button>
                <select onChange={(e) => {
                    const idx = Number(e.target.value);
                    if (isNaN(idx)) return;
                    const entry = savedSearches[idx];
                    if (!entry) return;
                    setSearchQuery(entry.query.searchQuery);
                    setFilter(entry.query.filter);
                    setSortBy(entry.query.sortBy);
                }} className="sort-select">
                    <option>Load Saved…</option>
                    {savedSearches.map((s, i) => (<option key={i} value={i}>{s.name}</option>))}
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
                <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="sort-select"
                    aria-label="Due date"
                />
                <button type="submit" className="add-button">Add Todo</button>
            </form>

            <div className="todos-wrapper">
                {groupBy === 'none' && (
                    sortedAndFilteredTodos.map(todo => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onToggle={toggleTodo}
                            onDelete={deleteTodo}
                            onTogglePin={togglePin}
                            onUpdatePriority={updatePriority}
                            onAddSubTask={addSubTask}
                            onUpdateStatus={updateStatus}
                            onAddTags={addTags}
                            onSetProject={setProject}
                            onStartTimer={startTimer}
                            onStopTimer={stopTimer}
                            totalTimeMs={totalTimeMs}
                            onToggleSubTask={toggleSubTask}
                            onUpdateDueDate={updateDueDate}
                            onUpdateEstimate={updateEstimate}
                        />
                    ))
                )}
                {groupBy !== 'none' && (
                    Object.entries(sortedAndFilteredTodos.reduce((acc, t) => {
                        const key = groupBy === 'status' ? (t.status || 'todo') : (t.project || 'Unassigned');
                        acc[key] = acc[key] || [];
                        acc[key].push(t);
                        return acc;
                    }, {})).map(([group, items]) => (
                        <div key={group}>
                            <h3 style={{ marginTop: '1rem' }}>{group}</h3>
                            {items.map(todo => (
                                <TodoItem
                                    key={todo.id}
                                    todo={todo}
                                    onToggle={toggleTodo}
                                    onDelete={deleteTodo}
                                    onTogglePin={togglePin}
                                    onUpdatePriority={updatePriority}
                                    onAddSubTask={addSubTask}
                                    onUpdateStatus={updateStatus}
                                    onAddTags={addTags}
                                    onSetProject={setProject}
                                    onStartTimer={startTimer}
                                    onStopTimer={stopTimer}
                                    totalTimeMs={totalTimeMs}
                                    onToggleSubTask={toggleSubTask}
                                    onUpdateDueDate={updateDueDate}
                                    onUpdateEstimate={updateEstimate}
                                />
                            ))}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
