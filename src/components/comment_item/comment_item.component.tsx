import { Comment } from "../../models/comment/comment.model"
import { Text } from "../text/text.component"
import styles from "./comment_item.module.scss";

type CommentItemProps = Comment
export function CommentItem(props: CommentItemProps) {
	return (
		<div className={styles.commentCard}>
			<Text style="body">"{props.body}"</Text>
			<Text style="caption">{props.dateTime.toLocaleString()}</Text>
		</div>
	)
}