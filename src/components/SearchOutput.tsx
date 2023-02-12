import { useCallback, useEffect, useState } from 'react';
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

const SearchOutput = ({userData, reviewer, blacklist, contributors, setReviewer}: SearchOutputProps): JSX.Element => {
	const [loadingReviewer, setLoadingReviewer] = useState<boolean>(false);
	const [searchList, setSearchList] = useState<Array<searchListType>>([]);

	const showRandomReviewer = useCallback(() =>  {
		if (contributors) {
			let count = Math.floor(Math.random() * (contributors.length - 1 + 1))
			setReviewer({
				login: searchList[count].login,
				avatar_url: searchList[count].avatar_url,
				html_url: searchList[count].html_url,
			})
		}
		}, [contributors, searchList, setReviewer]
	)

	useEffect(() => {
		if(contributors) {
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
		setLoadingReviewer(true);
		setTimeout(() => setLoadingReviewer(false), 2000);
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
		reviewer: state.reviewer,
		blacklist: state.blacklist,
		contributors: state.contributors
    }
}

export default connect(mapStateToProps, actions)(SearchOutput);