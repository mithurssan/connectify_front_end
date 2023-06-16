const initialTokenState = {
  token: '',
}

export const authReducer = (state = initialTokenState, action) => {
  switch (action.type) {
    case 'SET_TOKEN':
      return { ...state, token: action.payload }
    case 'REMOVE_TOKEN':
      return { ...state, token: null }

    default:
      return state
  }
}

const initialUserState = {
  username: '',
  email: '',
  password: '',
}

export const signupReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, username: action.payload }
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    default:
      return state
  }
}

const initialBusinessState = {
  companyName: '',
  companyEmail: '',
  companyNumber: '',
  companyPassword: '',
}

export const signupBusinessReducer = (state = initialBusinessState, action) => {
  switch (action.type) {
    case 'SET_BUSINESS_NAME':
      return { ...state, companyName: action.payload }
    case 'SET_BUSINESS_NUMBER':
      return { ...state, companyNumber: action.payload }
    case 'SET_BUSINESS_EMAIL':
      return { ...state, companyEmail: action.payload }
    case 'SET_BUSINESS_PASSWORD':
      return { ...state, companyPassword: action.payload }
    default:
      return state
  }
}

const initialAppState = {
  isLoaded: false,
  error: false,
}

export const appReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case 'SET_IS_LOADED':
      return {
        ...state,
        isLoaded: action.payload,
      }
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
