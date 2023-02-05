import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useOctokit } from '../hooks/octokitAPI.hook';
import { useHttp } from '../hooks/http.hook';

import { Accordion, Icon, Dropdown, Input, Button } from 'semantic-ui-react'

const Settings = ({setData}) => {
	const [activeIndex, setActiveIndex] = useState<number>(2);
	const [options, setOptions] = useState<
		Array<object>
	>([
		// { key: 'af', value: 'af', text: 'Afghanistan ggfr' },
		// { key: 'ax', value: 'ax', text: 'Aland Islands gfg' },
		// { key: 'al', value: 'al', text: 'Albania gfg' },
		// { key: 'dz', value: 'dz', text: 'Algeria gff' },
	]);
	const [login, setLogin] = useState<string>(''); 
	const [repo, setRepo] = useState<string>('');
	const [error, setError] = useState<boolean>(false);
	const [blacklist, setBlacklist] = useState<
		Array<string>
	>([]);

	type DropdownProps = {
		value: Array<string>;
	}

	type AccordionProps = {
		index: number;
	}

	const handleClick = (e: MouseEvent<HTMLDivElement, MouseEvent>, { index }: AccordionProps ): void => {
		const newIndex = activeIndex === index ? -1 : index
		setActiveIndex(newIndex)
	}

	const handleChangeList = (e: ChangeEvent, { value }: DropdownProps): void => {
		setBlacklist(value)
	}

	const [reqestOctokit] = useOctokit();
	const [request] = useHttp();
	// 'UginB', 'js-part-1'
	const handleLoadCantributers = () => {
		if (login && repo) {
			setError(false);
			reqestOctokit(login, repo)
			.then((res) => {
				request(res.data.contributors_url)
					.then((response) => {
						setData(response)
						// setOptions(response.filter(item => item.login !== login).map(item => item.key = item.id))
						console.log(response.map(item => item = {key: 'af', value: 'af', text: 'Afghanistan ggfr'}))
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

export default Settings;