import { useState, FC } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AnyAction } from 'redux';
import { State} from '../store/reducer';
import { setBlacklist, setLogin, setRepo } from '../store/actions';
import fetchUserData, { FetchUserDataFromGithub } from '../models/fetchUserData';
import { Accordion, Icon, Dropdown, Input, Button, DropdownItemProps } from 'semantic-ui-react';

type DispatchSettings = (arg: FetchUserDataFromGithub | AnyAction) => Promise<void>

const Settings: FC = () => {
	const dispatch = useDispatch() as DispatchSettings;
	const login = useSelector((state: State) => state.login);
	const repo = useSelector((state: State) => state.repo);
	const contributors = useSelector((state: State) => state.contributors);
	const [dropdownOpened, setDropdownOpened] = useState<boolean>(true);
	const [error, setError] = useState<boolean>(false);

	const optionsContributers: Array<DropdownItemProps> = contributors.map((item) => {return {key: item.id, value: item.login, text: item.login}})
	
	const handleLoadCantributers = () => {
		if (login && repo) {
			setError(false);
			dispatch(fetchUserData(login, repo))
				.catch(() => {
					setError(true);
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
				active={dropdownOpened === true}
				onClick={() => setDropdownOpened(!dropdownOpened)}
			>
			<Icon name='dropdown' />
				Настройки
			</Accordion.Title>
			<Accordion.Content active={dropdownOpened === true}>
				<div style={{display: 'flex', flexDirection: 'column'}}>
					<Input 
						icon='male' 
						iconPosition='left' 
						placeholder='Введите логин' 
						value={login}
						error={error}
						onChange={(e) => dispatch(setLogin(e.target.value))}/>
					<Input 
						icon='folder open outline' 
						iconPosition='left' 
						placeholder='Введите название репозитория' 
						value={repo}
						error={error} 
						onChange={(e) => dispatch(setRepo(e.target.value))}/>
					<Button 
						inverted 
						color='green'
						style={{margin: '15px 0'}}
						onClick={handleLoadCantributers}>
						Авторизироваться и загрузить список кантибьютеров
					</Button>
					<Dropdown 
						placeholder='Добавить в ЧС' 
						fluid 
						search 
						selection 
						options={optionsContributers} 
						multiple
						onChange={(e, props) => dispatch(setBlacklist(props.value as string[]))}/>
				</div>
			</Accordion.Content>
      	</Accordion>
	)
}

export default Settings;