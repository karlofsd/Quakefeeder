import { useEffect, useState } from "react"
import { Text } from "../text/text.component";
import styles from './tabbar.module.css';

export function TabBar() {
	const [currTab, setCurrTab] = useState<string | number>(1);

	useEffect(() => {
		console.log("Efecto tabbar...")
	}, [currTab])

	const handleActive = (value: string | number) => {
		setCurrTab(value)
	}

	return (
		<div className={styles.tabbarContainer}>
			<div className={`${currTab == 1 ? styles.activeTab : ""} ${styles.tab}`} onClick={() => handleActive(1)}>
				<Text style="subtitle">Features</Text>
			</div>
			<div className={`${currTab == 2 ? styles.activeTab : ""} ${styles.tab}`} onClick={() => handleActive(2)}>
				<Text style="subtitle">Guardadas</Text>
			</div>
		</div>
	)
}