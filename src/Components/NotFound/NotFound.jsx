import { useNavigate } from 'react-router-dom';
import styles from './NotFound.module.css';

export const NotFound = () => {
	const navigate = useNavigate();
	return (
		<>
			<h1 className={styles.title}>Такая страница не существует</h1>
			<button className={styles.btn} onClick={() => navigate('/')}>
				На главную
			</button>
		</>
	);
};
