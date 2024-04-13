import { Feature } from "../../models/feature/feature.model";
import { FeatureItem } from "../feature/feature_item.component";
import styles from "./feature_list.module.css";

type Props = {
	list: Feature[]
}
export function FeatureList({ list }: Props) {
	const buildItems = () => {
		return list.map((item) => <FeatureItem {...item} key={item.externalId} />)
	}

	return (
		<div className={styles.columnList}>
			{buildItems()}
		</div>
	)
}