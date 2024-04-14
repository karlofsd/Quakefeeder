import { FetchClient } from "../data/fetch_client";
import {
	CommentResponseDto,
	CommentRequestDto,
} from "../models/comment/comment.dto";
import { CommentMapper } from "../models/comment/comment.mapper";
import { Comment } from "../models/comment/comment.model";

export type SearchParams = {
	page?: number;
	perPage?: number;
};
export class CommentController {
	_client: FetchClient;
	mapper = new CommentMapper();
	path: string = "api/comments";
	totalComments = 0;
	constructor(client?: FetchClient) {
		this._client = client ?? new FetchClient();
	}

	async get(
		featureId: number,
		params?: SearchParams
	): Promise<Array<Comment>> {
		const url = this.path;
		const { data, pagination } = await this._client.get<CommentResponseDto>(
			url,
			{
				feature_id: featureId,
				page: params?.page ?? 1,
				per_page: params?.perPage ?? 10,
			}
		);
		this.totalComments = pagination.total;
		if (Array.isArray(data)) {
			return data.map((feature) => this.mapper.mapDtoToModel(feature));
		} else {
			return [];
		}
	}

	async save(featureId: number, comment: string): Promise<string> {
		const url = this.path;
		const response = await this._client.post<CommentRequestDto>(url, {
			feature_id: featureId,
			body: comment,
			date_time: Date.now().toString(),
		});
		response;
		return "success";
	}
}
