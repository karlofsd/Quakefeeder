import { createContext } from "react";
import { Feature } from "../models/feature/feature.model";

export const CommentsCtx = createContext<CommentsCtxProps>({});

type CommentsCtxProps = {
	feature?: Feature;
	isOpenDialog?: boolean;
	setIsOpenDialog?: (value: boolean) => void;
	setFeature?: (value: Feature) => void;
};
