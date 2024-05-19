import styles from './MainPage.module.css';
import { useEffect, useState } from 'react';
import { Form, TodoItem, Loader, Serach } from '../../Components';

export const MainPage = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [todos, setTodos] = useState([]);
	const [search, setSearch] = useState();

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

	const creatingTodo = async (event) => {
		setIsLoading(true);
		event.preventDefault();

		const form = event.target;
		const todoTitle = form.elements.textToDo.value;

		try {
			const response = await fetch(`http://localhost:3005/todo/`, {
				method: 'POST',
				headers: {
					'Content-type': 'application/json; charset=UTF-8',
				},
				body: JSON.stringify({
					title: todoTitle,
					completed: false,
				}),
			});

			const createPost = await response.json();
			const updatedPost = todos.concat(createPost);
			form.reset();

			setTodos(updatedPost);

			setIsLoading(false);
		} catch (error) {
			console.log(error);
			setIsLoading(false);
		}
	};

	const updateStatusTodo = async (id, checked) => {
		setIsLoading(true);

		try {
			const response = await fetch(`http://localhost:3005/todo/${id}`, {
				method: 'PATCH',
				headers: { 'Content-Type': 'application/json;charset=utf-8' },
				body: JSON.stringify({
					completed: checked,
				}),
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

	const searchTodo = (event) => {
		setSearch(event);
	};

	const hendelSertTodo = () => {
		const sortedTodos = [...todos].sort((a, b) => {
			if (a.title < b.title) return -1;
			if (a.title > b.title) return 1;
			return 0;
		});
		setTodos(sortedTodos);
	};

	let searchInput = search;
	if (!searchInput) {
		searchInput = '';
	}

	useEffect(() => {
		getTodo();
	}, []);

	return (
		<>
			<h1>To-Do</h1>
			<Serach searchTodo={searchTodo} />
			<Form onSubmit={creatingTodo} />

			<button className={styles.sort__btn} onClick={hendelSertTodo}>
				Сортировка ⇩
			</button>

			<ul className={styles.toDoList}>
				{isLoading ? (
					<Loader />
				) : (
					<>
						{todos
							.filter((item) => {
								return searchInput.toLowerCase() === ''
									? item
									: item.title.toLowerCase().includes(searchInput);
							})
							.map((todo) => (
								<TodoItem
									{...todo}
									key={todo.id}
									updateStatusTodo={updateStatusTodo}
								/>
							))}
					</>
				)}
			</ul>
		</>
	);
};
