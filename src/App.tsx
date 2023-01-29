// import logo from './logo.svg';
import { useState } from 'react';
import { useOctokit } from './hooks/octokitAPI.hook';
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
  );
}

export default App;
