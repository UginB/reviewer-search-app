import searchImg from '../img/search.png';

export const initialState: State = {
	userData: {
		owner: {
			login: 'нет авторизации',
			avatar_url: searchImg,
			html_url: `https://github.com/`,
		},
		contributors_url: null
	},
	reviewer: {
		login: 'неизвестен',
		avatar_url: searchImg,
		html_url: `https://github.com/`,
	},
	blacklist: [],
	contributors: [],
	login: '',
	repo: '',
};

const reducer = (state: State = initialState, action: Action) => {
    switch (action.type) {
        case "SET_USER_DATA":
            return {
                ...state,
                userData: action.payload
            };
        case "SET_BLACKLIST":
            return {
                ...state,
                blacklist: action.payload
            };
        case "SET_CONTRIBUTORS":
            return {
                ...state,
                contributors: action.payload
            };
		case "SET_LOGIN":
			return {
				...state,
				login: action.payload
			};
		case "SET_REPO":
			return {
				...state,
				repo: action.payload
			};
		case "SET_REVIWER":
			return {
				...state,
				reviewer: action.payload
			};
		case "SET_APP_STATE":
			return {
				...action.payload, 
				blacklist: []
			};
        default:
            return state;
    }
}

export type UserData = {
	owner: {
		login: string,
		avatar_url: string,
		html_url: string
	},
	contributors_url: string | null
}

export type ReviewerData = {
	login: string,
	avatar_url: string,
	html_url: string
}

export type Contributor = {
	avatar_url: string,
	contributions: number,
	events_url: string,
	followers_url: string,
	following_url: string,
	gists_url: string,
	gravatar_id: string, 
	html_url: string,
	id: number,
	login: string,
	node_id: string,
	organizations_url: string,
	received_events_url: string,
	repos_url: string,
	site_admin: boolean,
	starred_url: string,
	subscriptions_url: string,
	type: string,
	url: string,
}

export type State = {
	userData: UserData,
	reviewer: ReviewerData,
	blacklist: Array<string>,
	contributors: Array<Contributor>
	login: string,
	repo: string
}

export type Action = {
	type: string,
	payload: any | null
}

export default reducer;