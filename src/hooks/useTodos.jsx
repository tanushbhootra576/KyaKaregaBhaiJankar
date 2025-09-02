import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { addDays, addWeeks, addMonths, isToday } from 'date-fns';

const TodosContext = createContext(null);

const useTodosState = () => {
    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem('todos');
        return savedTodos ? JSON.parse(savedTodos).map(todo => ({
            ...todo,
            createdAt: new Date(todo.createdAt),
            dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
            endDate: todo.endDate ? new Date(todo.endDate) : null
        })) : [];
    });

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    useEffect(() => {
        const now = new Date();
        const recurringTodos = todos.filter(todo => todo.recurrence && !todo.completed);

        recurringTodos.forEach(todo => {
            if (!todo.lastGenerated || isToday(new Date(todo.lastGenerated))) return;

            let nextDueDate;
            switch (todo.recurrence) {
                case 'daily':
                    nextDueDate = addDays(todo.dueDate, 1);
                    break;
                case 'weekly':
                    nextDueDate = addWeeks(todo.dueDate, 1);
                    break;
                case 'monthly':
                    nextDueDate = addMonths(todo.dueDate, 1);
                    break;
                default:
                    return;
            }

            if (todo.endDate && nextDueDate > todo.endDate) return;

            const newTodo = {
                ...todo,
                id: Date.now().toString(),
                dueDate: nextDueDate,
                completed: false,
                lastGenerated: now
            };

            setTodos(prev => [...prev, newTodo]);
        });
    }, [todos]);

    const addTodo = useCallback((title, { recurrence = null, dueDate = null, endDate = null, tags = [], project = '', estimateMinutes = 0 } = {}) => {
        const newTodo = {
            id: Date.now().toString(),
            title,
            completed: false,
            priority: 'medium',
            createdAt: new Date(),
            pinned: false,
            subtasks: [],
            recurrence,
            dueDate,
            endDate,
            lastGenerated: new Date(),
            notes: '',
            tags,
            project,
            status: 'todo',
            estimateMinutes,
            timeLogs: [], // { startedAt, stoppedAt, durationMs }
        };
        setTodos(prev => [...prev, newTodo]);
    }, []);

    const toggleTodo = useCallback((id) => {
        setTodos(prev =>
            prev.map(todo => {
                if (todo.id !== id) return todo;
                const nextCompleted = !todo.completed;
                return { ...todo, completed: nextCompleted, completedAt: nextCompleted ? new Date() : null };
            })
        );
    }, []);

    const deleteTodo = useCallback((id) => {
        setTodos(prev => prev.filter(todo => todo.id !== id));
    }, []);

    const addSubTask = useCallback((todoId, title) => {
        const newSubTask = {
            id: Date.now().toString(),
            title,
            completed: false,
        };

        setTodos(prev =>
            prev.map(todo =>
                todo.id === todoId
                    ? { ...todo, subtasks: [...todo.subtasks, newSubTask] }
                    : todo
            )
        );
    }, []);

    const toggleSubTask = useCallback((todoId, subtaskId) => {
        setTodos(prev => prev.map(todo => {
            if (todo.id !== todoId) return todo;
            return {
                ...todo,
                subtasks: todo.subtasks.map(s => s.id === subtaskId ? { ...s, completed: !s.completed } : s)
            };
        }));
    }, []);

    const togglePin = useCallback((id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, pinned: !todo.pinned } : todo
            )
        );
    }, []);

    const updatePriority = useCallback((id, priority) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, priority } : todo
            )
        );
    }, []);

    const updateStatus = useCallback((id, status) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, status } : t));
    }, []);

    const addTags = useCallback((id, tags) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, tags: Array.from(new Set([...(t.tags || []), ...tags])) } : t));
    }, []);

    const setProject = useCallback((id, project) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, project } : t));
    }, []);

    const startTimer = useCallback((id) => {
        const now = Date.now();
        setTodos(prev => prev.map(t => t.id === id ? { ...t, timeLogs: [...(t.timeLogs || []), { startedAt: now, stoppedAt: null, durationMs: 0 }] } : t));
    }, []);

    const stopTimer = useCallback((id) => {
        const now = Date.now();
        setTodos(prev => prev.map(t => {
            if (t.id !== id) return t;
            const logs = [...(t.timeLogs || [])];
            const last = logs[logs.length - 1];
            if (last && !last.stoppedAt) {
                last.stoppedAt = now;
                last.durationMs = now - last.startedAt;
            }
            return { ...t, timeLogs: logs };
        }));
    }, []);

    const totalTimeMs = useCallback((id) => {
        const t = todos.find(t => t.id === id);
        if (!t) return 0;
        return (t.timeLogs || []).reduce((acc, l) => acc + (l.durationMs || 0), 0);
    }, [todos]);

    const updateDueDate = useCallback((id, dueDate) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, dueDate } : t));
    }, []);

    const updateEstimate = useCallback((id, estimateMinutes) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, estimateMinutes } : t));
    }, []);

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        addSubTask,
        toggleSubTask,
        togglePin,
        updatePriority,
        updateStatus,
        addTags,
        setProject,
        startTimer,
        stopTimer,
        totalTimeMs,
        updateDueDate,
        updateEstimate,
    };
};

export const TodosProvider = ({ children }) => {
    const value = useTodosState();
    return <TodosContext.Provider value={value}>{children}</TodosContext.Provider>;
};

export const useTodos = () => {
    const ctx = useContext(TodosContext);
    if (!ctx) throw new Error('useTodos must be used within a TodosProvider');
    return ctx;
};
