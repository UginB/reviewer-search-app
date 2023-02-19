import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer';

export const store = createStore(
	reducer, applyMiddleware()
);

store.subscribe(() => {
	localStorage.setItem('appState', JSON.stringify(store.getState()));
});