import { useEffect, useState } from 'react';
import { useLocalStorage } from '../hooks/localStorage.hook';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import UserCard from './UserCard';
import { Card, Button } from 'semantic-ui-react';
import { State } from '../store/reducer';
import searchImg from '../img/search.png';
import { Contributor, UserData } from '../store/reducer';

type SearchOutputProps = {
	userData: UserData,
	blacklist: Array<object>,
	contributors: Array<Contributor>
}

const SearchOutput = ({userData, blacklist, contributors}: SearchOutputProps): JSX.Element => {
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

	type searchListType = {
		login: string,
		avatar_url: string,
		html_url: string
	}

	const [loadingReviewer, setLoadingReviewer] = useState<boolean>(false);
	const [searchList, setSearchList] = useState<Array<searchListType>>([]);
	const [setLocalStorageItem, setLocalStorageObjItem] = useLocalStorage();
	
	useEffect(() => {
		if(userData) {
			setUser({
				login: userData.owner.login,
				avatar_url: userData.owner.avatar_url,
				html_url: userData.owner.html_url,
			})
		}
	}, [userData]);

	useEffect(() => {
		if(contributors) {
			setSearchList(
				contributors.filter((item) => !new Set(blacklist).has(item.login as String))
			)
		}
	}, [contributors, blacklist]);

	useEffect(() => {
		let searchInterval: NodeJS.Timer;
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
		if (contributors) {
			let count = Math.floor(Math.random() * (contributors.length - 1 + 1))
			setReviewer({
				login: searchList[count].login,
				avatar_url: searchList[count].avatar_url,
				html_url: searchList[count].html_url,
			})
		}
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

const mapStateToProps = (state: State) => {
    return {
        userData: state.userData,
		blacklist: state.blacklist,
		contributors: state.contributors
    }
}

export default connect(mapStateToProps, actions)(SearchOutput);

// export default SearchOutput;