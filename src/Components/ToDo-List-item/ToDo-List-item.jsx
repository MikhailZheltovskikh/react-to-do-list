import PropTypes from 'prop-types';
import styles from './ToDo-List-item.module.css';

export const ToDoListItem = ({
	todo,
	requestDeleteToDoItem,
	isEditing,
	isDeleting,
	requestUpdateToDoItem,
	isUpdating,
	requestEditToDoItem,
}) => {
	return (
		<>
			{todo.map(({ id, title, completed }) => (
				<li key={id} className={styles.toDoList__item}>
					<input
						className={styles.toDoList__item__input}
						type="checkbox"
						name="checkboxInput"
						checked={completed}
						onChange={(e) => requestUpdateToDoItem(id, e.target.checked)}
						disabled={isUpdating}
					/>
					<div className={styles.toDoList__item__text}>{title}</div>
					<button
						onClick={() => requestEditToDoItem(id)}
						className={styles.toDoList__item__edit__btn}
						disabled={isEditing}
					>
						✏️
					</button>
					<button
						onClick={() => requestDeleteToDoItem(id)}
						className={styles.toDoList__item__delete__btn}
						disabled={isDeleting}
					>
						X
					</button>
				</li>
			))}
		</>
	);
};

ToDoListItem.propTypes = {
	requestDeleteToDoItem: PropTypes.func,
	requestUpdateToDoItem: PropTypes.func,
};
