import { useEffect, useState, SyntheticEvent, MouseEvent } from 'react';
import { useOctokit } from '../hooks/octokitAPI.hook';
import { useHttp } from '../hooks/http.hook';
import { connect } from "react-redux";
import { State, Contributor } from '../store/reducer';
import * as actions from '../store/actions';
import { Accordion, Icon, Dropdown, Input, Button } from 'semantic-ui-react';

type SettingsProps = {
	login: string | undefined, 
	repo: string | undefined, 
	setUserData: Function, 
	setBlacklist: Function, 
	setLogin: Function, 
	setContributors: Function, 
	setRepo: Function
}

type DropdownProps = {
	value: Array<string>;
}

type AccordionProps = {
	index: number;
}

const Settings = ({login, repo, setUserData, setBlacklist, setLogin, setContributors, setRepo}: SettingsProps): JSX.Element => {
	const [reqestOctokit] = useOctokit();
	const [request] = useHttp();
	const [activeIndex, setActiveIndex] = useState<number>(2);
	const [options, setOptions] = useState<Array<object>>([]);
	const [error, setError] = useState<boolean>(false);
	
	useEffect(() => {
		if(localStorage.getItem('login') && localStorage.getItem('repo') && localStorage.getItem('user') && localStorage.getItem('repo')) {
			let cntr: Array<Contributor> = JSON.parse(localStorage.getItem('contributors') as string)
			setOptions(cntr.map(item => {return {key: item.id, value: item.login, text: item.login}}))
		}
	}, []);

	const handleClick = ( e: MouseEvent | TouchEvent, { index }: AccordionProps ): void => {
		const newIndex = activeIndex === index ? -1 : index
		setActiveIndex(newIndex);
	}

	const handleChangeList = (e: SyntheticEvent<HTMLElement, Event>, { value }: DropdownProps): void => {
		setBlacklist(value)
	}
	
	const handleLoadCantributers = () => {
		if (login && repo) {
			setError(false);
			reqestOctokit(login, repo)
			.then((res) => {
				console.log(res.data)
				setUserData(res.data)
				request(res.data.contributors_url)
					.then((response: Array<Contributor>) => {
						const cntrbtrs = response.filter(item => item.login !== login);
						console.log(cntrbtrs)
						setContributors(cntrbtrs);
						setOptions(cntrbtrs.map(item => {return {key: item.id, value: item.login, text: item.login}}))
					}).catch((e) => {
						setError(true);
						throw new Error(`Ошибка сервера: ${e}`)
					})
			}).catch((e) => {
				setError(true);
				throw new Error(`Ошибка сервера: ${e}`)
			})
		} else {
			setError(true);
		}
	}

	return (
		<Accordion 
			fluid 
			styled 
			style={{maxWidth: '500px', marginTop: '15px'}}>
			<Accordion.Title
				active={activeIndex === 2}
				index={2}
				onClick={() => handleClick}
			>
			<Icon name='dropdown' />
				Настройки
			</Accordion.Title>
			<Accordion.Content active={activeIndex === 2}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Input 
						icon='male' 
						iconPosition='left' 
						placeholder='Введите логин' 
						value={login}
						error={error}
						onChange={(e) => setLogin(e.target.value)}/>
					<Input 
						icon='folder open outline' 
						iconPosition='left' 
						placeholder='Введите название репозитория' 
						value={repo}
						error={error} 
						onChange={(e) => setRepo(e.target.value)}/>
					<Button 
						inverted 
						color='green'
						style={{margin: '15px 0'}}
						onClick={handleLoadCantributers}>
						Загрузить список кантибьютеров
					</Button>
					<Dropdown 
						placeholder='Добавить в ЧС' 
						fluid 
						search 
						selection 
						options={options} 
						multiple 
						onChange={() => handleChangeList}/>
				</div>
			</Accordion.Content>
      	</Accordion>
	)
}

const mapStateToProps = (state: State) => ({
	login: state.login,
	repo: state.repo
})

export default connect(mapStateToProps, actions)(Settings);