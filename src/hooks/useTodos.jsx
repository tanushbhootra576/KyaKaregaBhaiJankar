import { useState, useCallback } from 'react';

export const useTodos = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = useCallback((title) => {
        const newTodo = {
            id: Date.now().toString(),
            title,
            completed: false,
            priority: 'medium',
            createdAt: new Date(),
            pinned: false,
            subtasks: [],
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
