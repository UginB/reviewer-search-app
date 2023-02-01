// import logo from './logo.svg';
import { useState } from 'react';
import { useOctokit } from './hooks/octokitAPI.hook';

import { Container, Header, Card, Icon, Image, Accordion } from 'semantic-ui-react'
import './App.css';

function App() {
	const {reqestOctokit} = useOctokit();

	const [showSettings, setShowSettings] = useState(false);
	const [login, setlogin] = useState(null);
	const [repo, setRepo] = useState(null);
	const [blacklist, setBlacklist] = useState([]);
	// reqestOctokit('UginB', 'js-part-0').then(console.log)
	console.log('1')

	return (
    	<div className="App">
			<button className="btn" onClick={() => (showSettings) ? setShowSettings(false) : setShowSettings(true)}>настройки</button>
			{showSettings && 
			<form id="form" className="">
				<legend>поиск ревьюера</legend>
				{/* <datalist id="reviewerList"></datalist> */}
				<div className="">
					<label htmlFor=''>логин</label>
					<input
						type="text"
						id="login"
						placeholder='введите логин'
					/>
				</div>
				<div className="">
					<label>репозиторий</label>
					<input
						type="text"
						id="repo"
						placeholder='введите название репозитория'
					/>
				</div>
				<div className="">
					<label>черный список</label>
					<select multiple name="blacklist">
						<option disabled>Выберите логин для занесения в ЧС</option>
						<option value="Чебурашка">Чебурашка</option>
						<option value="Крокодил Гена">Крокодил Гена</option>
						<option value="Шапокляк">Шапокляк</option>
						<option value="Крыса Лариса">Крыса Лариса</option>
					</select>	
				</div>
				<button
					type="submit"
					id="submit"
					className=""
				>
					поиск
				</button>
				<button
					type="button"
					id="reset"
					className=""
				>
					сброс
				</button>
			</form>
		}

        <div id="output" className=""></div>
    </div>
	// <Container>
    // 	<Header as='h1' block style={{textAlign: 'center'}}>
	// 		Найди своего ревьюера
  	// 	</Header>
	// 	<Card>
	// 		<Image src='/images/avatar/large/matthew.png' wrapped ui={false} />
	// 		<Card.Content>
	// 		<Card.Header>Matthew</Card.Header>
	// 		<Card.Meta>
	// 			<span className='date'>Joined in 2015</span>
	// 		</Card.Meta>
	// 		<Card.Description>
	// 			Matthew is a musician living in Nashville.
	// 		</Card.Description>
	// 		</Card.Content>
	// 		<Card.Content extra>
	// 		<a>
	// 			<Icon name='user' />
	// 			22 Friends
	// 		</a>
	// 		</Card.Content>
	// 	</Card>
	// 	<Accordion fluid styled>
	// 		<Accordion.Title
	// 		active={activeIndex === 2}
	// 		index={2}
	// 		onClick={this.handleClick}
	// 		>
	// 		<Icon name='dropdown' />
	// 		How do you acquire a dog?
	// 		</Accordion.Title>
	// 		<Accordion.Content active={activeIndex === 2}>
	// 		<p>
	// 			Three common ways for a prospective owner to acquire a dog is from
	// 			pet shops, private owners, or shelters.
	// 		</p>
	// 		<p>
	// 			A pet shop may be the most convenient way to buy a dog. Buying a dog
	// 			from a private owner allows you to assess the pedigree and
	// 			upbringing of your dog before choosing to take it home. Lastly,
	// 			finding your dog from a shelter, helps give a good home to a dog who
	// 			may not find one so readily.
	// 		</p>
	// 		</Accordion.Content>
    //   	</Accordion>
  	// </Container>
  );
}

export default App;
