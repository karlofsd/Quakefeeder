import { FetchClient } from "../data/fetch_client";
import { MagType } from "../models/types/types.model";

export class TypesController {
	_client: FetchClient;
	path: string = "api/mag_types";
	constructor(client?: FetchClient) {
		this._client = client ?? new FetchClient();
	}

	async get(): Promise<Array<MagType>> {
		const url = this.path;
		const { data } = await this._client.get<MagType>(url);
		if (Array.isArray(data)) {
			return data;
		} else {
			return [];
		}
	}
}
