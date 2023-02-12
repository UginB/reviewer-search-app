import { type } from 'os';
import { Card, Icon, Image } from 'semantic-ui-react'

type UserCardProps = {
	position: string, 
	img: string, 
	login: string, 
	githubUrl: string
}

const UserCard: React.FC<any> = ({position, img, login, githubUrl}: UserCardProps): JSX.Element => {
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