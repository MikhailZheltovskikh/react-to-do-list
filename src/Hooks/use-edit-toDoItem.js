import { useState } from 'react';

export const useRequestEditToDoItem = (refreshToDoListFlag) => {
	const [isEditing, setIsEditing] = useState(false);

	const requestEditToDoItem = (id) => {

		/*
		const [inputValue, setInputValue] = useState('');
		
		*/

		const newText = prompt('Введите новый текст', []);

		setIsEditing(true);

		fetch(`http://localhost:3005/todo/${id}`, {
			method: 'PATCH',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: newText,
			}),
		})
			.then((rawResponse) => rawResponse.json())
			.then(() => {
				refreshToDoListFlag();
			})
			.finally(() => setIsEditing(false));
	};

	return {
		requestEditToDoItem,
		isEditing,
	};
};
