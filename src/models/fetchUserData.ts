import { reqestOctokit } from "../hooks/octokitAPI.hook";
import { request } from "../hooks/http.hook";
import { RootState } from "../store/store";
import { Dispatch } from "redux";
import { Contributor } from "../store/reducer";
import { setUserData, setContributors } from "../store/actions";

export type FetchUserDataFromGithub = (
	dispatch: Dispatch,
	getState: () => RootState
) => Promise<void>;

export type FetchUserData = (login: string, repo: string) => FetchUserDataFromGithub;

const fetchUserData: FetchUserData = (login: string, repo: string) => {
	const fetchUserData = (dispatch: Dispatch, getState: () => RootState) => {
		return reqestOctokit(login, repo)
			.then((res) => {
				dispatch(setUserData(res.data));
				request(res.data.contributors_url)
					.then((response: Array<Contributor>) => {
						dispatch(setContributors(response.filter(item => item.login !== login)));
					}).catch((e) => {
						throw new Error(`Ошибка сервера: ${e}`)
					})
			}).catch((e) => {
				throw new Error(`Ошибка сервера: ${e}`)
			})
	};
	return fetchUserData;
};

export default fetchUserData;

