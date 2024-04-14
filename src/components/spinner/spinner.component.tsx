import styles from "./spinner.module.scss";
export const Spinner = () => {
	return (
		<div className={styles['lds-ripple']}>
			<div></div>
			<div></div>
		</div>
	)
}