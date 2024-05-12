import { useEffect, useState } from 'react';

export const useRequestGetToDoList = (refreshToDoListFlag) => {
	const [todoList, setTodoList] = useState([]);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/todo')
			.then((loaderData) => loaderData.json())
			.then((loaderTodo) => {
				setTodoList(loaderTodo);
			})
			.finally(() => setIsLoading(false));
	}, [refreshToDoListFlag]);

	return {
		todoList,
		isLoading,
	};
};
