import { Action } from "./reducer";
import { Contributor } from "./reducer";

export const setUserData = (value: Object): Action => ({type: 'SET_USER_DATA', payload: value});
export const setReviewer = (value: Object): Action => ({type: 'SET_REVIWER', payload: value});
export const setBlacklist = (value: Array<Contributor>): Action => ({type: 'SET_BLACKLIST', payload: value});
export const setContributors = (value: Array<Contributor>): Action => ({type: 'SET_CONTRIBUTORS', payload: value});
export const setLogin = (value: string): Action => ({type: 'SET_LOGIN', payload: value});
export const setRepo = (value: string): Action => ({type: 'SET_REPO', payload: value});
export const setAppState = (value: Object): Action => ({type: 'SET_APP_STATE', payload: value});

