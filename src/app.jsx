import { useState } from 'react';
import styles from './app.module.css';
import { ToDoListItem, Form, Loader } from './Components';
import {
	useRequestGetToDoList,
	useRequestCreateToDoItem,
	useRequestDeleteToDoItem,
	useRequestUpdateToDoItem,
	useRequestEditToDoItem
} from './Hooks';

export const App = () => {
	const [refreshToDoListFlag, setRefreshToDoListFlag] = useState(false);
	const refreshToDoList = () => setRefreshToDoListFlag(!refreshToDoListFlag);

	const { todoList, isLoading } = useRequestGetToDoList(refreshToDoListFlag);

	const { requestCreateToDoItem, isCreating } =
		useRequestCreateToDoItem(refreshToDoList);

	const { requestDeleteToDoItem, isDeleting } =
		useRequestDeleteToDoItem(refreshToDoList);

	const { requestUpdateToDoItem, isUpdating } =
		useRequestUpdateToDoItem(refreshToDoList);

		const { requestEditToDoItem, isEditing } =
		useRequestEditToDoItem(refreshToDoList);

	return (
		<div className={styles.app}>
			<h1>To-Do</h1>
			<Form onSubmit={requestCreateToDoItem} isCreating={isCreating} />

			<ul className={styles.toDoList}>
				{isLoading ? (
					<Loader />
				) : (
					<ToDoListItem
						todo={todoList}
						refreshToDoList={refreshToDoList}
						deleting={isDeleting}
						editing={isEditing}
						updating={isUpdating}
						requestDeleteToDoItem={requestDeleteToDoItem}
						requestUpdateToDoItem={requestUpdateToDoItem}
						requestEditToDoItem={requestEditToDoItem}
					/>
				)}
			</ul>
		</div>
	);
};
