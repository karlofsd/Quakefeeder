import { useEffect, useState } from "react";
import {
	FeatureController,
	SearchParams,
} from "../controllers/feature.controller";
import { Feature } from "../models/feature/feature.model";

export const useFeatures = () => {
	const [features, setFeatures] = useState<Feature[]>([]);
	const [isComplete, setIsComplete] = useState(false);
	const [totalFeatures, setTotalFeatures] = useState(0);
	const controller = new FeatureController();

	useEffect(() => {
		// load();
		if (features.length == totalFeatures) {
			setIsComplete(true);
		} else {
			setIsComplete(false);
		}
	}, [features]);

	const load = async (params?: SearchParams) => {
		const _features = await controller.get(params);
		setTotalFeatures(controller.totalFeatures);

		setFeatures(
			params?.page != 1 ? [...features, ..._features] : _features
		);
	};

	return { features, isComplete, load, totalFeatures };
};
