import React from 'react';
import { useState, useEffect } from 'react';
import { useOctokit } from './hooks/octokitAPI.hook';
import { useHttp } from './hooks/http.hook';

import Header from './components/Header';
import Main from './components/Main';
import SearchOutput from './components/SearchOutput';
import Settings from './components/Settings';
import Footer from './components/footer';

import { Container } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
	const [reqestOctokit] = useOctokit();
	const [request] = useHttp();
	const [showSettings, setShowSettings] = useState(false);
	const [login, setlogin] = useState(null);
	const [repo, setRepo] = useState(null);
	const [blacklist, setBlacklist] = useState([]);
	// reqestOctokit('UginB', 'js-part-0').then(console.log)
	const [data, setData] = useState([]);

	return (
		<Container style={{height: '100vh'}}>
			<Header/>
			<Main>
				<SearchOutput data={data}/>
				<Settings setData={setData}/>
			</Main>
			<Footer/>
		</Container>
	);
}

export default App;
