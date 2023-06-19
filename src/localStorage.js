export const loadPersistedState = () => {
  return (dispatch) => {
    try {
      const serializedState = localStorage.getItem('reduxState')
      if (serializedState === null) {
        return undefined
      }
      const state = JSON.parse(serializedState)
      dispatch({ type: 'LOAD_PERSISTED_STATE', payload: state })
    } catch (error) {
      console.log('Error loading persisted state:', error)
    }
  }
}

export const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxState', serializedState)
  } catch (error) {
    console.log('Error saving state to local storage:', error)
  }
}
