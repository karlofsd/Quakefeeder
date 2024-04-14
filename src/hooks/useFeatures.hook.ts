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
	const [debounce, setDebounce] = useState(0);

	useEffect(() => {
		if (features.length == totalFeatures) {
			setIsComplete(true);
		} else {
			setIsComplete(false);
		}
	}, [features]);

	useEffect(() => {
		return () => clearTimeout(debounce);
	}, [debounce]);

	const load = (params?: SearchParams) => {
		const getData = setTimeout(async () => {
			const _features = await controller.get(params);
			setTotalFeatures(controller.totalFeatures);

			setFeatures(
				params?.page != 1 ? [...features, ..._features] : _features
			);
		}, 1500);
		setDebounce(getData);
	};

	return { features, isComplete, load, totalFeatures };
};
