export interface Mapper<T, U, V> {
	mapModeltoDto(model: T): V;

	mapDtoToModel(dto: U): T;
}
