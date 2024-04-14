import { useState } from "react";
import { Feature } from "../models/feature/feature.model";

export const useCommentDialog = () => {
	const [isOpenDialog, setIsOpenDialog] = useState(false);
	const [feature, setFeature] = useState<Feature>();

	return { isOpenDialog, setIsOpenDialog, feature, setFeature };
};
