import { useState, useCallback, useEffect } from 'react';
import { isToday, isTomorrow, addDays, addWeeks, addMonths } from 'date-fns';

export const useTodos = () => {
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

    const addTodo = useCallback((title, { recurrence = null, dueDate = null, endDate = null } = {}) => {
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
        };
        setTodos(prev => [...prev, newTodo]);
    }, []);

    const toggleTodo = useCallback((id) => {
        setTodos(prev =>
            prev.map(todo =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
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

    return {
        todos,
        addTodo,
        toggleTodo,
        deleteTodo,
        addSubTask,
        togglePin,
        updatePriority,
    };
};
