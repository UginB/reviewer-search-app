import { FC } from 'react';
import { Container } from "semantic-ui-react";

const Footer: FC<{}>  = (): JSX.Element => {
	return (
		<Container style={{margin: '30px 0'}} textAlign='center'>
			Created by <a href="https://github.com/UginB">UginB</a> for <a href="https://school.hh.ru/">HH programming school</a>
		</Container>
	)
}

export default Footer;