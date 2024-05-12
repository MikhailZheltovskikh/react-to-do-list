import { useState } from 'react';

export const useRequestUpdateToDoItem = (refreshToDoListFlag) => {
	const [isUpdating, setIsUpdating] = useState(false);

	const requestUpdateToDoItem = (id, checked) => {
		setIsUpdating(true);

		fetch(`http://localhost:3005/todo/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				completed: checked
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshToDoListFlag();
			})
			.finally(() => setIsUpdating(false));
	};

	return {
		requestUpdateToDoItem,
		isUpdating,
	};
};
