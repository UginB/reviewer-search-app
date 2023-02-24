import { useEffect, FC } from 'react';
import { useDispatch } from 'react-redux';
import { setAppState } from '../store/actions';
import Header from './Header';
import Main from './Main';
import SearchOutput from './SearchOutput';
import Settings from './Settings';
import Footer from './Footer';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const App: FC = () => {
	const dispatch = useDispatch();
	
	useEffect(() => {
		try {
			if(localStorage.getItem('appState')) dispatch(setAppState(JSON.parse(localStorage.getItem('appState') as string)))
		} catch(e) {
			throw new Error(`Ошибка localStorage: ${e.message}`)
		}
	}, []);

	return (
		<Container style={{height: '100vh'}}>
			<Header/>
			<Main>
				<SearchOutput/>
				<Settings/>
			</Main>
			<Footer/>
		</Container>
	);
}

export default App;