import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Loader } from '../../Components';
import styles from './TodoItemAllInfo.module.css';
import { useNavigate } from 'react-router-dom';

export const TodoItemAllInfo = () => {
	const { id } = useParams();
	const [todo, setTodo] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todo/${id}`)
			.then((response) => response.json())
			.then((data) => {
				setTodo(data);
				setIsLoading(false);
			});
	}, [id]);

	const navigate = useNavigate();

	const hendelEdit = () => {
		navigate(`/task/${id}/edit`);
	};

	const hendelDelete = async () => {
		await fetch(`http://localhost:3005/todo/${id}`, {
			method: 'DELETE',
		});
		await navigate('/');
	};

	return (
		<>
			{isLoading ? (
				<Loader />
			) : (
				<div>
					<h4 className={styles.title}>Полный текст</h4>
					<div className={styles.text}>{todo.title}</div>
					<button className={styles.btn} onClick={hendelEdit}>
						Редактировать
					</button>
					<button className={styles.btn} onClick={hendelDelete}>
						Удалить
					</button>
					<button className={styles.btn} onClick={() => navigate(-1)}>
						Назад
					</button>
				</div>
			)}
		</>
	);
};
