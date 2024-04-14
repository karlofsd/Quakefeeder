import { useContext, useEffect, useRef, useState } from "react";
import { CommentsCtx } from "../../context/comments.context";
import { CommentsStatus, useComments } from "../../hooks/useComments.hook";
import { CommentItem } from "../comment_item/comment_item.component";
import { FeatureItem } from "../feature/feature_item.component";
import { Text } from "../text/text.component";
import styles from "./comments_dialog.module.scss";
import { Spinner } from "../spinner/spinner.component";

export function CommentsDialog() {
	const refDialog = useRef<HTMLDialogElement>(null);
	const refText = useRef<HTMLTextAreaElement>(null);
	const refScroll = useRef<HTMLDivElement>(null)
	const refSentinel = useRef<HTMLDivElement>(null)
	const { feature, isOpenDialog, setIsOpenDialog } = useContext(CommentsCtx);
	const { comments, setFeatureId, saveComment, totalComments, load, status } = useComments();
	const [text, setText] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isLoadMore, setIsLoadMore] = useState(false);

	const handleIntersection: IntersectionObserverCallback = async (entries) => {
		if (entries[0].isIntersecting) {
			if (status == CommentsStatus.full) {
				console.log('is complete')
			}
			if (!(status === CommentsStatus.loading)) {
				onLoad()
			}
		}
	};


	useEffect(() => {
		const observer = new IntersectionObserver(handleIntersection);
		if (refSentinel.current) {
			if (status == CommentsStatus.full) {
				observer.unobserve(refSentinel.current)
			} else {
				observer.observe(refSentinel.current!);
			}
		}
		return () => {
			observer.disconnect();
		};
	}, [comments]);

	useEffect(() => {
		if ([CommentsStatus.success, CommentsStatus.full].includes(status)) {
			if (isLoading)
				setIsLoading(false)
			if (isLoadMore) setIsLoadMore(false)
		}

	}, [status])

	useEffect(() => {
		if (isOpenDialog) {
			refDialog.current?.showModal()
			setFeatureId(feature?.id)
		} else {
			refDialog.current?.close()
		}
	}, [isOpenDialog])

	const onSave = async () => {
		setIsLoading(true)
		await saveComment(text);
		refScroll.current?.scrollTo({ top: 0 })
		setText("");
		refText.current!.value = ""
	}

	const onLoad = () => {
		setIsLoadMore(true)
		load()
	}

	return (

		<div className={styles.dialogScrim}>
			<dialog ref={refDialog}>
				<div className={`${styles.dialogContainer}`}>
					{feature ? <FeatureItem dialogHeader={true} {...feature} /> : <></>}
					<div style={{ width: '100%', marginBlock: 16, height: 1, backgroundColor: 'gray' }}></div>
					<div className={styles.boxComment}>
						<textarea ref={refText} rows={3} placeholder="Type comment here" onChange={(e) => setText(e.target.value)} />
						<button disabled={!refText.current?.value} onClick={onSave}>Publish</button>
					</div>
					<div style={{ height: 16 }}></div>
					<div className={styles.rowTitle}>
						<Text style="title">Comments</Text>
						<Text style="label">{comments.length} / {totalComments}</Text>
					</div>

					<div ref={refScroll} className={styles.commentList} >
						{!isLoading ?
							<></> : <Spinner />}
						{comments.map((comment, index) => <div key={index} ref={comments.length - 1 == index ? refSentinel : null}><CommentItem  {...comment} /></div>)}
						{!isLoadMore ? <></> : <Spinner />}
					</div>
					<div style={{ height: 24 }}></div>
					<button onClick={() => setIsOpenDialog?.call(null, false)}>Close</button>
				</div>
			</dialog>
		</div>

	)
}