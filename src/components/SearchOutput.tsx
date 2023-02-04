import React from 'react';
import { Card, Button } from 'semantic-ui-react';

import UserCard from './UserCard';

const SearchOutput = () => {
	return(
		<>
			<Card.Group>
				<UserCard position={'ТЕКУЩИЙ ПОЛЬЗОВАТЕЛЬ'}/>
				<UserCard position={'РЕВЬЮЕР'}/>
			</Card.Group>
			<Button basic color='black' style={{marginTop: '15px'}}>
				НАЙТИ РЕВЬЮЕРА
			</Button>
		</>
	)
}

export default SearchOutput;