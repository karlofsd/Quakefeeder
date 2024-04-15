import { FetchClient } from "../data/fetch_client";
import {
	FeatureRequestDto,
	FeatureResponseDto,
} from "../models/feature/feature.dto";
import { FeatureMapper } from "../models/feature/feature.mapper";
import { Feature } from "../models/feature/feature.model";

export type SearchParams = {
	magType?: string[];
	page?: number;
	perPage?: number;
};
export class FeatureController {
	_client: FetchClient;
	mapper = new FeatureMapper();
	path: string = "api/features";
	totalFeatures = 0;
	constructor(client?: FetchClient) {
		this._client = client ?? new FetchClient();
	}

	async get(params?: SearchParams): Promise<Array<Feature>> {
		const url = this.path;
		const { data, pagination } = await this._client.get<FeatureResponseDto>(
			url,
			{
				mag_type: params?.magType
					? JSON.stringify(params.magType)
					: null,
				page: params?.page,
				per_page: params?.perPage,
			}
		);
		this.totalFeatures = pagination.total;
		if (Array.isArray(data)) {
			return data.map((feature) => this.mapper.mapDtoToModel(feature));
		} else {
			return [];
		}
	}

	async save(feature: Feature): Promise<string> {
		const url = this.path;
		const response = await this._client.post<FeatureRequestDto>(
			url,
			this.mapper.mapModeltoDto(feature)
		);
		response;
		return "success";
	}
}
