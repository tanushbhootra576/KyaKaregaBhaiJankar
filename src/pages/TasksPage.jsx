import { TodoList } from '../components/TodoList';
import './pages.css';

export const TasksPage = () => {
    return (
        <section className="page">
            <div className="page-header">
                <h2>Tasks</h2>
            </div>
            <TodoList />
        </section>
    );
}
