import { Card, Icon, Image } from 'semantic-ui-react'

const UserCard = ({position, img, login, githubUrl}) => {
	return(
		<Card>
			<Image 
				src={img} 
				wrapped 
				ui={false} />
			<Card.Content>
			<Card.Header>{login}</Card.Header>
			<Card.Meta>
				{position}
			</Card.Meta>
			</Card.Content>
			<Card.Content extra>
			<a href={githubUrl}>
				<Icon name='user' />
				ПЕРЕЙТИ НА СТРАНИЦУ
			</a>
			</Card.Content>
		</Card>
	)
}

export default UserCard;