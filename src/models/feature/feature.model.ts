type Coordinates = {
	longitud: number;
	latitud: number;
};

export interface Feature {
	id?: number;
	externalId?: string;
	magnitude: number;
	place: string;
	time?: string;
	tsunami?: boolean;
	magType: string;
	title: string;
	coordinates: Coordinates;
	externalUrl: string;
}
