import axios from "axios";
import { Config } from "./config";

type Params = {
	mag_type?: string[];
	page?: number;
	per_page?: number;
};

type Response<T> = {
	data: T[];
	pagination: {
		per_page: number;
		total: number;
		page: number;
	};
};

export class FetchClient {
	constructor() {}

	private maxPage: number = 1000;

	private getUrl(url: string, params?: Params): string {
		let uri: string = `${Config.host}/${url}`;
		if (params) {
			uri += "?";
			uri += `mag_type=${params.mag_type ?? "[]"}&`;
			uri += `page=${params.page ?? 1}&`;
			uri += `per_page=${params.per_page ?? this.maxPage}`;
		}
		return uri;
	}

	async get<U>(url: string, params: Params): Promise<Response<U>> {
		const response = await axios.get(this.getUrl(url, params));
		return response.data;
	}

	post(url: string, body: object): Promise<object> {
		return axios.post(this.getUrl(url), JSON.stringify(body));
	}
}
