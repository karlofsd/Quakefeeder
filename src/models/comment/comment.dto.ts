export interface CommentResponseDto {
	id: number;
	type: string;
	attributes: {
		feature_id: number;
		body: string;
		date_time: string;
	};
}

export interface CommentRequestDto {
	id?: number;
	feature_id: number;
	body: string;
	date_time: string;
}
