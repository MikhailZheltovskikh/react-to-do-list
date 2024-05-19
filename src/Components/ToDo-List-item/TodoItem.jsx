import styles from './ToDo-List-item.module.css';
import { NavLink } from 'react-router-dom';

export const TodoItem = ({ id, completed, title, updateStatusTodo }) => {
	return (
		<li className={`${styles.toDoList__item} ${completed ? styles.toDoList__item__disable : ''}`} >
			<div className={styles.toDoList__item__box}>
				<input
					className={styles.toDoList__item__input}
					type="checkbox"
					name="checkboxInput"
					checked={completed}
					onChange={(e) => updateStatusTodo(id, e.target.checked)}
				/>
				<NavLink to={`task/${id}`} className={styles.toDoList__item__text}>
					{title}
				</NavLink>
			</div>
		</li>
	);
};
