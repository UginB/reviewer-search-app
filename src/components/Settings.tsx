import { useEffect, useState, FC } from 'react';
import { useOctokit } from '../hooks/octokitAPI.hook';
import { useHttp } from '../hooks/http.hook';
import { connect } from "react-redux";
import { State, Contributor } from '../store/reducer';
import * as actions from '../store/actions';
import { Accordion, Icon, Dropdown, Input, Button } from 'semantic-ui-react';

type SettingsProps = {
	login: string | undefined, 
	repo: string | undefined,
	contributors: Array<Contributor>,
	setUserData: Function, 
	setBlacklist: Function, 
	setLogin: Function, 
	setContributors: Function, 
	setRepo: Function
}

const Settings: FC<SettingsProps> = ({login, repo, contributors, setUserData, setBlacklist, setLogin, setContributors, setRepo}): JSX.Element => {
	const [reqestOctokit] = useOctokit();
	const [request] = useHttp();
	const [activeIndex, setActiveIndex] = useState<number>(2);
	const [options, setOptions] = useState<Array<object>>([]);
	const [error, setError] = useState<boolean>(false);

	useEffect(() => setOptions(
		contributors.map(item => {return {key: item.id, value: item.login, text: item.login}})
	), [contributors]);

	const handleClick = (): void => {
		const newIndex = activeIndex === 2 ? -1 : 2
		setActiveIndex(newIndex);
	}
	
	const handleLoadCantributers = () => {
		if (login && repo) {
			setError(false);
			reqestOctokit(login, repo)
			.then((res) => {
				setUserData(res.data)
				request(res.data.contributors_url)
					.then((response: Array<Contributor>) => {
						setContributors(response.filter(item => item.login !== login));
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
	};

	return (
		<Accordion 
			fluid 
			styled 
			style={{maxWidth: '500px', marginTop: '15px'}}>
			<Accordion.Title
				active={activeIndex === 2}
				onClick={handleClick}
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
						onChange={(e, props) => setBlacklist(props.value)}/>
				</div>
			</Accordion.Content>
      	</Accordion>
	)
}

const mapStateToProps = (state: State) => ({
	login: state.login,
	repo: state.repo,
	contributors: state.contributors
})

export default connect(mapStateToProps, actions)(Settings);