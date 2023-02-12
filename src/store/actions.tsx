import { Action } from "./reducer";
import { Contributor } from "./reducer";

export const setUserData:Function = (value: Object): Action => ({type: 'SET_USER_DATA', payload: value});
export const setBlacklist:Function = (value: Array<Contributor>): Action => ({type: 'SET_BLACKLIST', payload: value});
export const setContributors:Function = (value: Array<Contributor>): Action => ({type: 'SET_CONTRIBUTORS', payload: value});
export const setLogin:Function = (value: string): Action => ({type: 'SET_LOGIN', payload: value});
export const setRepo:Function = (value: string): Action => ({type: 'SET_REPO', payload: value});


