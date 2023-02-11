import React, { useEffect, useState } from 'react';
import UserCard from './UserCard';
import { Card, Button } from 'semantic-ui-react';

import searchImg from '../img/search.png';

const SearchOutput = ({userData, blacklist, login, contributors}) => {
	const [user, setUser] = useState({
		login: 'нет авторизации',
		avatar_url: searchImg,
		html_url: `https://github.com/`,
	})
	const [reviewer, setReviewer] = useState({
		login: 'неизвестен',
		avatar_url: searchImg,
		html_url: `https://github.com/`,
	})

	const [loadingReviewer, setLoadingReviewer] = useState(false);
	const [searchList, setSearchList] = useState([]);

	useEffect(() => {
		if(userData.owner) {
			setUser({
				login: userData.owner.login,
				avatar_url: userData.owner.avatar_url,
				html_url: userData.owner.html_url,
			})
		}
	}, [userData]);

	useEffect(() => {
		setSearchList(
    		contributors.filter((item) => !new Set(blacklist).has(item.login))
		)
	}, [contributors, blacklist]);

	useEffect(() => {
		let searchInterval
		if (loadingReviewer) {
			searchInterval = setInterval(() => {
				showRandomReviewer()
		  }, 200);
		}
	
		return () => {
		  clearInterval(searchInterval);
		};
	  }, [loadingReviewer]);

	const showRandomReviewer = () =>  {
		let count = Math.floor(Math.random() * (contributors.length - 1 + 1))
		setReviewer({
			login: searchList[count].login,
			avatar_url: searchList[count].avatar_url,
			html_url: searchList[count].html_url,
		})
	}
	
	const handleClick = () => {
		setLoadingReviewer(true);
		setTimeout(() => setLoadingReviewer(false), 2000);
	}

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
					img={reviewer.avatar_url} 
					login={reviewer.login}
					githubUrl={reviewer.html_url}/>
			</Card.Group>
			<Button 
				inverted 
				color='red' 
				onClick={handleClick}
				style={{marginTop: '15px'}}>
				НАЙТИ РЕВЬЮЕРА
			</Button>
		</>
	)
}

export default SearchOutput;