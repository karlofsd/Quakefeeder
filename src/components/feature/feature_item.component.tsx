import { Feature } from "../../models/feature/feature.model";
import { Text } from "../text/text.component";
import styles from "./feature_item.module.scss"

type FeatureItemProps = {
	openComments?: (feature: Feature) => void,
	dialogHeader?: boolean
} & Feature;

export function FeatureItem(props: FeatureItemProps) {

	const getLocalDateTime = (time?: string | number | Date): Date | null => {
		if (!time) return null;
		const date = new Date(time);
		return date
	}

	return (
		<div className={`${props.dialogHeader ? styles['featureCard-dialog'] : styles.featureCard}`}>
			<a href={props.externalUrl} target="blank">
				<div className={styles.magBox} >
					<Text style="caption">Magnitude</Text>
					<Text style="header">{props.magnitude.toFixed(1)}</Text>
				</div>
			</a>
			<div className={styles.bodyFeature}>
				<div className={styles.placeRow}>
					<img src="src/assets/location.svg" alt="location icon" />
					<a href={`https://www.google.com/maps/@${props.coordinates.latitude},${props.coordinates.longitude},7z?entry=ttu`} target="blank"><Text style="subtitle">{props.place}</Text></a>
				</div>
				<div className={styles.datetimeBox}>
					<Text style="body">{getLocalDateTime(Number(props.time))?.toDateString()} {getLocalDateTime(Number(props.time))?.toLocaleTimeString()}</Text>
				</div>
			</div>
			{!props.dialogHeader ? <div className={styles.commentBox} onClick={() => {
				const feature: Feature = props
				props.openComments?.call(props.openComments, feature)
			}}>
				<img src='src/assets/review.svg' alt="comment icon" />
				<Text style="label">Deja tu comentario</Text>
			</div> : <></>}
		</div>
	)
}