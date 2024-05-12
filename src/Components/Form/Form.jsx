import PropTypes from 'prop-types';
import styles from './Form.module.css';

export const Form = ({onSubmit, isCreating}) => {
	return (
		<form className={styles.create__form} onSubmit={onSubmit}>
			<label className={styles.create__form__label}>
				<input
					className={styles.create__form__input}
					placeholder="Введите текст"
					type="text"
					name='textToDo'
				/>
			</label>
			<button className={styles.create__form__btn} type="submit" disabled={isCreating}>
				Добавить
			</button>
		</form>
	);
};

Form.propTypes = {
	onSubmit: PropTypes.func,
	isCreating: PropTypes.bool,
};