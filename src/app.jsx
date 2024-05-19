import styles from './app.module.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainPage, NotFound, TodoItemEdit, TodoItemAllInfo  } from './Components';


export const App = () => {
	return (
		<div className={styles.app}>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="task/:id" element={<TodoItemAllInfo />} />
				<Route path="task/:id/:edit" element={<TodoItemEdit />} />
				<Route path="/404" element={<NotFound />} />
				<Route path="*" element={<Navigate to="/404" />} />
			</Routes>
		</div>
	);
};
