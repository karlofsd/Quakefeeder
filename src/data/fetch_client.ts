import axios from "axios";
import { Config } from "./config";

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

	private getUrl(url: string, params?: object): string {
		let uri: string = `${Config.host}/${url}`;

		if (params) {
			const _params = { ...params };
			const entries = Object.entries(_params);
			const strParams = entries
				.filter(([key, value]) => value)
				.map(([key, value]) => `${key}=${value}`);
			if (strParams.length > 0) uri += "?" + strParams.join("&");
		}
		return uri;
	}

	async get<U>(url: string, params?: object): Promise<Response<U>> {
		const response = await axios.get(this.getUrl(url, params));
		return response.data;
	}

	async post<U>(url: string, body: U): Promise<object> {
		return await axios.post(this.getUrl(url), body);
	}
}
