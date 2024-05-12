import { useState } from 'react';

export const useRequestDeleteToDoItem = (refreshToDoListFlag) => {
	const [isDeleting, setIsDeleting] = useState(false);

	const requestDeleteToDoItem = (id) => {
		setIsDeleting(true);

		fetch(`http://localhost:3005/todo/${id}`, {
			method: 'DELETE',
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshToDoListFlag();
			})
			.finally(() => setIsDeleting(false));
	};

	return {
		requestDeleteToDoItem,
		isDeleting,
	};
};

