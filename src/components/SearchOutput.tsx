import { useCallback, useEffect, useState, FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setReviewer } from '../store/actions';
import { State } from '../store/reducer';
import UserCard from './UserCard';
import { Card, Button } from 'semantic-ui-react';

type searchListType = {
	login: string,
	avatar_url: string,
	html_url: string
}

const SearchOutput: FC = () => {
	const userData = useSelector((state: State) => state.userData);
	const reviewer = useSelector((state: State) => state.reviewer);
	const blacklist = useSelector((state: State) => state.blacklist);
	const contributors = useSelector((state: State) => state.contributors);
	const dispatch = useDispatch()
	
	const [loadingReviewer, setLoadingReviewer] = useState<boolean>(false);
	const [searchList, setSearchList] = useState<Array<searchListType>>([]);
	const [error, setError] = useState<boolean>(false);
	
	const showRandomReviewer = useCallback(() =>  {
		if (contributors) {
			let count = Math.floor(Math.random() * ((contributors.length - blacklist.length - 1) + 1));
			dispatch(setReviewer({
				login: searchList[count].login,
				avatar_url: searchList[count].avatar_url,
				html_url: searchList[count].html_url,
			}))
		}
	}, [searchList]);

	useEffect(() => {
		setError(false);
		if(contributors.length > 0) {
			setSearchList(
				contributors.filter((item) => !blacklist.includes(item.login as string))
			)
		}
	}, [contributors, blacklist]);

	useEffect(() => {
		let searchInterval: NodeJS.Timer;
		if (loadingReviewer) searchInterval = setInterval(showRandomReviewer, 200);
	
		return () => {
		  	clearInterval(searchInterval);
		};
	}, [loadingReviewer, showRandomReviewer]);
	
	const handleClick = (): void => {
		if (blacklist.length !== contributors.length) {
			setError(false);
			setLoadingReviewer(true);
			setTimeout(() => setLoadingReviewer(false), 2000);
		} else {
			setError(true);
		}
	}

	return(
		<>
			<Card.Group>
				<UserCard 
					position={'ЭТО ВЫ'}  
					img={userData.owner.avatar_url} 
					login={userData.owner.login}
					githubUrl={userData.owner.html_url}/>
				<UserCard 
					position={'ВАШ РАНДОМНЫЙ РЕВЬЮЕР'}
					img={reviewer.avatar_url} 
					login={reviewer.login}
					githubUrl={reviewer.html_url}/>
			</Card.Group>
			<Button 
				disabled={loadingReviewer}
				inverted 
				color='red' 
				onClick={handleClick}
				style={{marginTop: '15px'}}>
				НАЙТИ РЕВЬЮЕРА
			</Button>
			{(error) ? <div style={{color: 'red'}}>не заданы настройки, нет контрбьюторов или они все в черном списке</div> : null}
		</>
	)
}

export default SearchOutput;