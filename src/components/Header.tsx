import React from 'react';
import { Header as HeaderElem } from 'semantic-ui-react';

const Header = () => {
	return (
		<HeaderElem as='h1' block style={{textAlign: 'center'}}>
			Найди своего ревьюера на <a style={{textDecoration: 'none', color: 'grey'}} href="https://github.com/">GitHub</a>
  		</HeaderElem>
	)
}

export default Header;