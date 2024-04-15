import { useEffect, useState } from "react";
import { TypesController } from "../controllers/types.controller";
import { MagType } from "../models/types/types.model";

export const useTypes = () => {
	const typesController = new TypesController();
	const [types, setTypes] = useState<MagType[]>([]);
	useEffect(() => {
		loadTypes();
	}, []);
	const loadTypes = async () => {
		const _types = await typesController.get();
		setTypes(_types);
	};

	return { types };
};
