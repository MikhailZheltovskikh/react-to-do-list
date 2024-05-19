import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../Components';
import styles from './TodoItemEdit.module.css';
import { useNavigate } from 'react-router-dom';

export const TodoItemEdit = () => {
	const { id } = useParams();
	const [todoEdit, setTodoEdit] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todo/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setTodoEdit(data);
				setIsLoading(false);
			});
	}, [id]);

	const hendelChange = (e) => {
		const { value, name } = e.target;
		setTodoEdit((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const hendelUpdate = async () => {
		await fetch(`http://localhost:3005/todo/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
			body: JSON.stringify(todoEdit),
		});
		await navigate("/")
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<h4 className={styles.title}>Редактор текста</h4>
					<textarea
						className={styles.text}
						value={todoEdit.title}
						onChange={hendelChange}
						name="title"
					/>
					<button className={styles.btn} onClick={hendelUpdate}>
						Сохранить изменения
					</button>
				</div>
			)}
		</>
	);
};
