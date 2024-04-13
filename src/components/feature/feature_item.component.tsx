import { Feature } from "../../models/feature/feature.model";
import { Text } from "../text/text.component";
import styles from "./feature_item.module.css"


export function FeatureItem(props: Feature) {

	const getLocalDateTime = (time?: string | number | Date): Date | null => {
		if (!time) return null;
		const date = new Date(time);
		return date
	}

	return (
		<div className={styles.featureCard}>
			<div className={styles.magBox}>
				<Text style="caption">Magnitude</Text>
				<Text style="header">{props.magnitude.toFixed(1)}</Text>
			</div>
			<div className={styles.bodyFeature}>
				<div className={styles.placeRow}>
					<img src="src/assets/location.svg" alt="location icon" />
					<Text style="subtitle">{props.place}</Text>
				</div>
				<div className={styles.datetimeBox}>
					<Text style="body">{getLocalDateTime(Number(props.time))?.toDateString()} {getLocalDateTime(Number(props.time))?.toLocaleTimeString()}</Text>
				</div>
			</div>
			<div className={styles.commentBox}>
				<img src='src/assets/review.svg' alt="comment icon" />
				<Text style="label">Deja tu comentario</Text>
			</div>
		</div>
	)
}