import { useEffect, useState } from "react";
import { CommentController } from "../controllers/comment.controller";
import { Comment } from "../models/comment/comment.model";

export enum CommentsStatus {
	"empty",
	"loading",
	"success",
	"full",
	"cancel",
}

export const useComments = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [featureId, setFeatureId] = useState<number>();
	const [totalComments, setTotalComments] = useState(0);
	const [currPage, setCurrPage] = useState(0);
	const controller = new CommentController();
	const [debounce, setDebounce] = useState(0);
	const [status, setStatus] = useState<CommentsStatus>(CommentsStatus.empty);

	useEffect(() => {
		if (featureId) loadComments(featureId!);
	}, [featureId]);

	useEffect(() => {
		if (status === CommentsStatus.loading) loadComments(featureId!);
	}, [status, comments, currPage]);

	useEffect(() => {
		return () => {
			setStatus(CommentsStatus.cancel);
			clearTimeout(debounce);
			setStatus(CommentsStatus.loading);
		};
	}, [debounce]);

	const loadComments = async (featureId: number) => {
		if (status === CommentsStatus.full) return;
		const getData = setTimeout(async () => {
			const page = currPage + 1;
			const data = await controller.get(featureId, {
				page: page,
				perPage: 4,
			});
			setTotalComments(controller.totalComments);
			if (page == 1) setComments(data);
			else setComments([...comments, ...data]);
			setCurrPage(page);
			if (controller.totalComments < currPage * 4) {
				setStatus(CommentsStatus.full);
			} else {
				setStatus(CommentsStatus.success);
			}
		}, 1500);
		setDebounce(getData);
	};

	const saveComment = async (body: string) => {
		const response = await controller.save(featureId!, body);
		setCurrPage(0);
		setStatus(CommentsStatus.loading);
	};

	const load = () => {
		setStatus(CommentsStatus.loading);
	};

	return {
		comments,
		status,
		setFeatureId,
		saveComment,
		load,
		totalComments,
	};
};
