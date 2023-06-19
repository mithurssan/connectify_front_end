import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {
  authReducer,
  signupReducer,
  signupBusinessReducer,
  userReducer,
} from './reducers'
import { loadPersistedState, saveStateToLocalStorage } from './localStorage'

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
  user: signupReducer,
  business: signupBusinessReducer,
  userID: userReducer,
})

export const resettableRootReducer = (state, action) => {
  if (action.type === 'CLEAR_STATE') {
    state = undefined
  }
  return rootReducer(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

// Load persisted state from local storage
store.dispatch(loadPersistedState())

// Save state to local storage whenever it changes
store.subscribe(() => {
  const state = store.getState()
  saveStateToLocalStorage(state)
})

export const persistor = persistStore(store)
