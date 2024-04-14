import { useContext } from "react";
import { CommentsCtx } from "../../context/comments.context";
import { Feature } from "../../models/feature/feature.model";
import { FeatureItem } from "../feature/feature_item.component";
import styles from "./feature_list.module.scss";

type Props = {
	list: Feature[]
}
export function FeatureList({ list }: Props) {
	const commentCtx = useContext(CommentsCtx);

	const buildItems = () => {
		return list.map((item) => <FeatureItem openComments={handleDialog} {...item} key={item.externalId} />)
	}

	const handleDialog = (feature: Feature) => {
		commentCtx?.setIsOpenDialog?.call(Boolean, true);
		commentCtx?.setFeature?.call(Object, feature);
	}

	return (
		<div className={styles.columnList}>
			{buildItems()}
		</div>
	)
}