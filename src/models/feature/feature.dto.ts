export interface FeatureResponseDto {
	id?: number;
	type: string;
	attributes: {
		external_id?: string;
		magnitude?: number;
		place: string;
		time?: string;
		tsunami?: boolean;
		mag_type: string;
		title: string;
		coordinates: {
			longitude: number;
			latitude: number;
		};
	};
	links: {
		external_url: string;
	};
}

export interface FeatureRequestDto {
	id?: number;
	external_id?: string;
	magnitude?: number;
	place: string;
	time?: string;
	tsunami?: boolean;
	mag_type: string;
	title: string;
	coordinates: {
		longitude: number;
		latitude: number;
	};
	external_url: string;
}
