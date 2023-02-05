import React, { useEffect } from 'react';
import { useOctokit } from '../hooks/octokitAPI.hook';
import { useHttp } from '../hooks/http.hook';

import UserCard from './UserCard';

import { Card, Button } from 'semantic-ui-react';

const SearchOutput = ({data}) => {
	return(
		<>
			<Card.Group>
				<UserCard position={'ЭТО ВЫ'} data={data}/>
				<UserCard position={'ВАШ РАНДОМНЫЙ РЕВЬЮЕР'} data={data}/>
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