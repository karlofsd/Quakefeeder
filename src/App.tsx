import { useEffect, useState } from 'react';
import './App.css';
import { Filter, Text as _Text } from './components';
import { FeatureList } from './components/feature_list/feature_list.component';
import { SearchParams } from './controllers/feature.controller';
import { useFeatures } from './hooks/useFeatures.hook';

function App() {
	const { features, isComplete, load } = useFeatures();
	const [isLoading, setIsLoading] = useState(false);
	const [currPage, setCurrPage] = useState(1);
	const [params, setParams] = useState<SearchParams>({});

	useEffect(() => {
	}, [currPage])

	const handleLoad = async (params: SearchParams = {}) => {
		setIsLoading(true)
		setCurrPage(params?.page ?? 1)
		setParams(params)
		await load(params)
		setIsLoading(false)
		// setTimeout(() => , 1500)
	}

	return (
		<div style={{ marginTop: '24px' }}>
			<_Text style='header'>QUAKEFEEDER</_Text>
			<div style={{ height: '12px' }}></div>
			<_Text style='title'>Buscador de sismos</_Text>
			<div style={{ height: '32px' }}></div>
			<Filter onLoad={handleLoad} />
			{/* <TabBar /> */}
			<div style={{ height: '40px' }}></div>
			{isLoading ? <div>Cargando ....</div> : <FeatureList list={features} />}
			{isComplete || isLoading ? <></> : <button style={{ marginBlock: '16px' }} onClick={() => handleLoad({ ...params, page: currPage + 1 })}>Cargar más</button>}
		</div>
	)
}

export default App
