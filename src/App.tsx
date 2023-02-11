import { useState } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import SearchOutput from './components/SearchOutput';
import Settings from './components/Settings';
import Footer from './components/Footer';

import { Container } from 'semantic-ui-react'
import './App.css';
import 'semantic-ui-css/semantic.min.css'

function App() {
	const [userData, setUserData] = useState({});
	const [blacklist, setBlacklist] = useState<Array<string>>([]);
	const [login, setLogin] = useState<string>('');
	const [contributors, setContributors] = useState<Array<object>>([]);
// 'UginB', 'js-part-1'
// 'facebook', 'react'
	return (
		<Container style={{height: '100vh'}}>
			<Header/>
			<Main>
				<SearchOutput 
					userData={userData}
					blacklist={blacklist}
					contributors={contributors}/>
				<Settings 
					setUserData={setUserData}
					setBlacklist={setBlacklist}
					setLogin={setLogin}
					login={login}
					contributors={contributors}
					setContributors={setContributors}/>
			</Main>
			<Footer/>
		</Container>
	);
}

export default App;
