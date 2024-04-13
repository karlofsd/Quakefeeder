export interface Mapper<T, U> {
	mapModeltoDto(model: T): U;

	mapDtoToModel(dto: U): T;
}
