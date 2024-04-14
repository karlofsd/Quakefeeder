import { Mapper } from "../mapper.interface";
import { CommentResponseDto, CommentRequestDto } from "./comment.dto";
import { Comment } from "./comment.model";

export class CommentMapper
	implements Mapper<Comment, CommentResponseDto, CommentRequestDto>
{
	mapModeltoDto(model: Comment): CommentRequestDto {
		return {
			id: model.id,
			feature_id: model.featureId,
			body: model.body,
			date_time: Date.parse(model.dateTime.toString()).toString(),
		};
	}
	mapDtoToModel(dto: CommentResponseDto): Comment {
		return {
			id: dto.id,
			featureId: dto.attributes.feature_id,
			body: dto.attributes.body,
			dateTime: new Date(Number(dto.attributes.date_time)),
		};
	}
}
