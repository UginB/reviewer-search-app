import Header from './Header';
import Main from './Main';
import SearchOutput from './SearchOutput';
import Settings from './Settings';
import Footer from './Footer';

import { Container } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const App: React.FC = (): JSX.Element => {
// 'UginB', 'js-part-1'
// 'facebook', 'react'
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
