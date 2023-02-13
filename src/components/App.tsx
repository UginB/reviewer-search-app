import { useEffect, FC } from 'react';
import { State } from '../store/reducer';
import { connect } from 'react-redux';
import * as actions from '../store/actions';

import Header from './Header';
import Main from './Main';
import SearchOutput from './SearchOutput';
import Settings from './Settings';
import Footer from './Footer';
import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

type AppProps = {
	setAppState: Function
}

const App: FC<AppProps> = ({setAppState}): JSX.Element => {
	useEffect(() => {
		try {
			if(localStorage.getItem('appState')) setAppState(JSON.parse(localStorage.getItem('appState') as string))
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

const mapStateToProps = (state: State) => (state)

export default connect(mapStateToProps, actions)(App);