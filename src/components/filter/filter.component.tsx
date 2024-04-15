import { useEffect, useState } from 'react';
import { SearchParams } from '../../controllers/feature.controller';
import styles from './filter.module.scss';
import { useTypes } from '../../hooks/useTypes.hook';

type Props = {
	onLoad: (params?: SearchParams) => Promise<void>,
}
export function Filter({ onLoad }: Props) {
	const defaultPerPage = 10
	const { types } = useTypes()
	const [perPage, setPerPage] = useState(defaultPerPage);
	const [type, setType] = useState<string>()

	useEffect(() => {
		onLoad({ page: 1, perPage });
	}, [])

	const handleLimit = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPerPage(Number(e.target?.value ?? 0))
	}

	return (
		<div className={styles.filterContainer}>
			<div className={styles.magType}>
				<label style={{ paddingRight: '12px' }} htmlFor='mag-type'>Magnitude type</label>
				<select id='mag-type' onChange={(e) => setType(e.target.value)}>
					<option>All</option>
					{types.map(type => <option value={type.symbol}>{type.label}</option>)}
				</select>
			</div>
			<div className={styles.limit}>
				<label style={{ paddingRight: '12px' }} htmlFor='per-page'>Page limit</label>
				<div>
					<input id='per-page' type='number' min={1} max={1000} defaultValue={defaultPerPage} onChange={(value) => handleLimit(value)} />

				</div>
			</div>
			<button style={{ width: '100%', flex: 1 }} onClick={() => onLoad({ page: 1, perPage, magType: type ? [type] : undefined })}>Load</button>
		</div>
	);
}