import { FetchClient } from "../data/fetch_client";
import { FeatureDto } from "../models/feature/feature.dto";
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
		const { data, pagination } = await this._client.get<FeatureDto>(url, {
			mag_type: params?.magType,
			page: params?.page,
			per_page: params?.perPage,
		});
		this.totalFeatures = pagination.total;
		if (Array.isArray(data)) {
			return data.map((feature) => this.mapper.mapDtoToModel(feature));
		} else {
			return [];
		}
	}

	// async getById(): Promise<Feature> {
	// 	const url = this.path;
	// 	const { data } = await this._client.get<Feature>(url, {
	// 		mag_type: params?.magType,
	// 		page: params?.page,
	// 		per_page: params?.perPage,
	// 	});
	// 	if (Array.isArray(data)) {
	// 		return data.map((feature) => this.mapper.mapDtoToModel(feature));
	// 	} else {
	// 		return [];
	// 	}
	// }

	async save(featureId: number, comment: string): Promise<string> {
		const url = this.path;
		const response = await this._client.post(url, {
			feature_id: featureId,
			body: comment,
		});
		console.log(response);
		return "success";
	}
}
