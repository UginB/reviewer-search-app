import React from 'react';
import { useState } from 'react';
import { useOctokit } from './hooks/octokitAPI.hook';

import Header from './components/Header';
import Main from './components/Main';
import SearchOutput from './components/SearchOutput';
import Settings from './components/Settings';
import Footer from './components/footer';

import { Container } from 'semantic-ui-react'

import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
	const {reqestOctokit} = useOctokit();

	const [showSettings, setShowSettings] = useState(false);
	const [login, setlogin] = useState(null);
	const [repo, setRepo] = useState(null);
	const [blacklist, setBlacklist] = useState([]);
	// reqestOctokit('UginB', 'js-part-0').then(console.log)
	console.log('1')

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
