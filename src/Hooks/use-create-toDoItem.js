import { useState } from 'react';

export const useRequestCreateToDoItem = (refreshToDoListFlag) => {
	const [isCreating, setIsCreating] = useState(false);

	const requestCreateToDoItem = (event) => {
		setIsCreating(true);
		event.preventDefault();

		const form = event.target;
		const todoTitle = form.elements.textToDo.value;

		fetch('http://localhost:3005/todo', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: todoTitle,
				completed: false,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshToDoListFlag()
			})
			.finally(() => setIsCreating(false));

			form.reset();
	};

	return {
		requestCreateToDoItem,
		isCreating,
	};
};
