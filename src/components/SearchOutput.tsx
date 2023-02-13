import { useCallback, useEffect, useState, FC } from 'react';
import { connect } from "react-redux";
import * as actions from '../store/actions';
import { State, Contributor, UserData, ReviewerData } from '../store/reducer';
import UserCard from './UserCard';
import { Card, Button } from 'semantic-ui-react';

type SearchOutputProps = {
	userData: UserData,
	reviewer: ReviewerData,
	blacklist: Array<object>,
	contributors: Array<Contributor>,
	setReviewer: Function
}

type searchListType = {
	login: string,
	avatar_url: string,
	html_url: string
}

const SearchOutput: FC<SearchOutputProps> = ({userData, reviewer, blacklist, contributors, setReviewer}): JSX.Element => {
	const [loadingReviewer, setLoadingReviewer] = useState<boolean>(false);
	const [searchList, setSearchList] = useState<Array<searchListType>>([]);
	const [error, setError] = useState<boolean>(false);

	const showRandomReviewer = useCallback(() =>  {
		if (contributors) {
			let count = Math.floor(Math.random() * ((contributors.length - blacklist.length - 1) - 0 + 1) + 0);
			setReviewer({
				login: searchList[count].login,
				avatar_url: searchList[count].avatar_url,
				html_url: searchList[count].html_url,
			})
		}
	}, [searchList]);

	useEffect(() => {
		setError(false);
		if(contributors.length > 0) {
			setSearchList(
				contributors.filter((item) => !new Set(blacklist).has(item.login as String))
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
	
	const handleClick = ():void => {
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
			{(error) ? <div style={{color: 'red'}}>нет контрбьюторов или они все в черном списке</div> : null}
		</>
	)
}

const mapStateToProps = (state: State) => {
    return {
        userData: state.userData,
		reviewer: state.reviewer,
		blacklist: state.blacklist,
		contributors: state.contributors
    }
}

export default connect(mapStateToProps, actions)(SearchOutput);