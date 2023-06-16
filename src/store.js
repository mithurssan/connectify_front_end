import { legacy_createStore as createStore, combineReducers } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';
import { authReducer, signupReducer, appReducer, signupBusinessReducer } from './reducers';

const rootReducer = combineReducers({
	auth: authReducer,
	user: signupReducer,
	app: appReducer,
	business: signupBusinessReducer,
});

const store = createStore(rootReducer, devToolsEnhancer());

export default store;
