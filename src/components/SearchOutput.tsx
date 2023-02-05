import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Card, Button } from 'semantic-ui-react';

import searchImg from '../img/search.png';

const SearchOutput = ({data, blacklist, login}) => {
	const [user, setUser] = useState({
		login: 'нет авторизации',
		avatar_url: searchImg,
		html_url: `https://github.com/`,
	})

	useEffect(() => {
		data.forEach(item => {
			if(item.login === login) {
				setUser(item);
			}
		})
	}, [login, data]);

	return(
		<>
			<Card.Group>
				<UserCard 
					position={'ЭТО ВЫ'}  
					img={user.avatar_url} 
					login={user.login}
					githubUrl={user.html_url}/>
				<UserCard 
					position={'ВАШ РАНДОМНЫЙ РЕВЬЮЕР'}
					img={user.avatar_url} 
					login={user.login}
					githubUrl={user.html_url}/>
			</Card.Group>
			<Button 
				inverted 
				color='red' 
				// onClick={() => reqestOctokit}
				style={{marginTop: '15px'}}>
				НАЙТИ РЕВЬЮЕРА
			</Button>
		</>
	)
}

export default SearchOutput;