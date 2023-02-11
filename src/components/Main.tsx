import { ReactNode } from "react";

type MainType = {
	children: ReactNode;
};

const Main = ({children}: MainType) => {
 return(
	<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
		{children}
	</div>
 )
}

export default Main;