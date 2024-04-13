import { Mapper } from "../mapper.interface";
import { FeatureDto } from "./feature.dto";
import { Feature } from "./feature.model";

export class FeatureMapper implements Mapper<Feature, FeatureDto> {
	constructor() {}
	mapModeltoDto(model: Feature): FeatureDto {
		return {
			id: model.id,
			type: "feature",
			attributes: {
				external_id: model.externalId,
				magnitude: model.magnitude,
				mag_type: model.magType,
				place: model.place,
				title: model.title,
				time: model.time,
				tsunami: model.tsunami,
				coordinates: model.coordinates,
			},
			links: {
				external_url: model.externalUrl,
			},
		};
	}
	mapDtoToModel(dto: FeatureDto): Feature {
		return {
			id: dto.id,
			externalId: dto.attributes.external_id,
			magnitude: dto.attributes.magnitude ?? 0,
			place: dto.attributes.place,
			time: dto.attributes.time,
			tsunami: dto.attributes.tsunami ?? false,
			magType: dto.attributes.mag_type,
			title: dto.attributes.title,
			coordinates: dto.attributes.coordinates,
			externalUrl: dto.links.external_url,
		};
	}
}
