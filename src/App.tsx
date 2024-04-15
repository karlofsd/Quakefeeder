import { useEffect, useState } from 'react';
import './App.css';
import { Filter, Spinner, Text as _Text, FeatureList, CommentsDialog } from './components';
import { SearchParams } from './controllers/feature.controller';
import { useFeatures } from './hooks/useFeatures.hook';
import { CommentsCtx } from './context/comments.context';
import { useCommentDialog } from './hooks';

function App() {
	const { features, isComplete, load } = useFeatures();
	const commentsCtxValue = useCommentDialog();
	const [isLoading, setIsLoading] = useState(false);
	const [moreLoading, setMoreLoading] = useState(false);
	const [currPage, setCurrPage] = useState(1);
	const [params, setParams] = useState<SearchParams>({});

	useEffect(() => {
	}, [currPage])

	const handleLoad = async (params: SearchParams = {}) => {
		params?.page == 1 ?
			setIsLoading(true) : setMoreLoading(true);
		setCurrPage(params?.page ?? 1)
		setParams(params)
		await load(params)
		setTimeout(() =>
			params?.page == 1 ?
				setIsLoading(false) : setMoreLoading(false)
			, 1500)
	}

	return (
		<CommentsCtx.Provider value={commentsCtxValue}>
			<div style={{ marginTop: '24px' }}>
				<_Text style='header'>QUAKEFEEDER</_Text>
				<div style={{ height: '12px' }}></div>
				<_Text style='title'>Earthquakes tracking history</_Text>
				<div style={{ height: '32px' }}></div>
				<Filter onLoad={handleLoad} />
				<div style={{ height: '40px' }}></div>
				{isLoading ? <Spinner /> : <FeatureList list={features} />}
				{isComplete || isLoading ? <></> : moreLoading ? <Spinner /> : <button style={{ marginBlock: '16px' }} onClick={() => handleLoad({ ...params, page: currPage + 1 })}>Load more</button>}

				{/* Dialog */}
				{commentsCtxValue.isOpenDialog ? <CommentsDialog /> : <></>}
			</div>
		</CommentsCtx.Provider>
	)
}

export default App
