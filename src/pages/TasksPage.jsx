import { TodoList } from '../components/TodoList';
import './pages.css';

export const TasksPage = () => {
    return (
        <section className="page">

            <TodoList />
        </section>
    );
}
