import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'

import searchImg from '../img/search.png';

const UserCard = ({position}) => {
	return(
		<Card>
			<Image src={searchImg} wrapped ui={false} />
			<Card.Content>
			<Card.Header>Matthew</Card.Header>
			<Card.Meta>
				{position}
			</Card.Meta>
			<Card.Description>
				Matthew is a musician living in Nashville.
			</Card.Description>
			</Card.Content>
			<Card.Content extra>
			<a>
				<Icon name='user' />
				22 Friends
			</a>
			</Card.Content>
		</Card>
	)
}

export default UserCard;