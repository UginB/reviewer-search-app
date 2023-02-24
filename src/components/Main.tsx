import { ReactNode, FC } from "react";

type MainType = {
	children: ReactNode;
};

const Main: FC<MainType> = ({children}) => {
	return(
		<div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
			{children}
		</div>
	)
}

export default Main;