import { useEffect, useState } from 'react';
import styles from './app.module.css';
import { ToDoListItem, Loader } from './Components';

export const App = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState([]);

	const getTodo = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('http://localhost:3005/todo');
			const data = await response.json();
			setTodos(data);
			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const updateTodo = async (id, payload) => {
		setIsLoading(true);
		try {
			const response = await fetch(`http://localhost:3005/todo/${id}`, {
				method: 'PATCH',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({ title: payload }),
			});

			const updatePost = await response.json();

			//  поиск по индексу
			const updateIndexPost = todos.findIndex((post) => post.id === id);
			const copyTodo = todos.slice();
			copyTodo[updateIndexPost] = updatePost;

			setTodos(copyTodo);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const deleteTodo = async (id) => {
		setIsLoading(true);

		try {
			const response = await fetch(`http://localhost:3005/todo/${id}`, {
				method: 'DELETE',
			});

			const updatePost = await response.json();

			//  поиск по индексу
			const updateIndexPost = todos.findIndex((todo) => todo.id === id);
			const copyTodo = todos.slice();
			copyTodo[updateIndexPost] = updatePost;

			setTodos(copyTodo);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		getTodo();
	}, []);

	return (
		<div className={styles.app}>
			<h1>To-Do</h1>
			{/* <Form onSubmit={() => {}} isCreating={{}} /> */}

			<ul className={styles.toDoList}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						<ToDoListItem
							todos={todos}
							updateTodo={updateTodo}
							deleteTodo={deleteTodo}
						/>
					</>
				)}
			</ul>
		</div>
	);
};
