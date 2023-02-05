import React from 'react';
import { useState, useEffect } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import SearchOutput from './components/SearchOutput';
import Settings from './components/Settings';
import Footer from './components/Footer';

import { Container } from 'semantic-ui-react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
	const [data, setData] = useState([]);
	const [blacklist, setBlacklist] = useState<Array<string>>([]);
	const [login, setLogin] = useState<string>('');
// 'UginB', 'js-part-1'
	return (
		<Container style={{height: '100vh'}}>
			<Header/>
			<Main>
				<SearchOutput 
					data={data}
					blacklist={blacklist}
					login={login}/>
				<Settings 
					setData={setData}
					setBlacklist={setBlacklist}
					setLogin={setLogin}
					login={login}/>
			</Main>
			<Footer/>
		</Container>
	);
}

export default App;
