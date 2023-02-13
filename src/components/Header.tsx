import { FC } from 'react';
import { Header as HeaderElem } from 'semantic-ui-react';

const Header: FC<{}> = (): JSX.Element => {
	return (
		<HeaderElem as='h1' block style={{textAlign: 'center', fontSize: 'large'}}>
			Найди рандомного ревьюера из кантрибьютеров на <a style={{textDecoration: 'none', color: 'red'}} href="https://github.com/">GitHub</a>
  		</HeaderElem>
	)
}

export default Header;