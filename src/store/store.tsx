import { createStore, applyMiddleware } from 'redux';
import { initialState } from './reducer';
import thunk from 'redux-thunk';
import reducer from './reducer';

export const store = createStore(
	reducer, initialState, applyMiddleware(thunk)
);

store.subscribe(() => {
	localStorage.setItem('appState', JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;