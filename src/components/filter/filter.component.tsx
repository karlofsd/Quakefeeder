import { useEffect, useState } from 'react';
import { SearchParams } from '../../controllers/feature.controller';
import styles from './filter.module.scss';

type Props = {
	onLoad: (params?: SearchParams) => Promise<void>,
}
export function Filter({ onLoad }: Props) {
	const defaultPerPage = 10
	const [perPage, setPerPage] = useState(defaultPerPage);

	useEffect(() => {
		onLoad({ page: 1, perPage });
	}, [])

	const handleLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPerPage(Number(e.target?.value ?? 0))
	}

	return (
		<div className={styles.filterContainer}>
			<div className={styles.magType}>
				<label style={{ paddingRight: '12px' }} htmlFor='mag-type'>Tipo de Magnitud</label>
				<select id='mag-type' defaultValue={1}>
					<option value={0}>ML</option>
					<option value={1}>MD</option>
				</select>
			</div>
			<div className={styles.limit}>
				<label style={{ paddingRight: '12px' }} htmlFor='per-page'>Límite de página</label>
				<div>
					<input id='per-page' type='number' min={1} max={1000} defaultValue={defaultPerPage} onChange={(value) => handleLimit(value)} />

				</div>
			</div>
			<button style={{ width: '100%', flex: 1 }} onClick={() => onLoad({ page: 1, perPage })}>Cargar</button>
		</div>
	);
}