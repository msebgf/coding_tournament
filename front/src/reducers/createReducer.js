export default (initialState, handlers) => {
  return function reducer(state = initialState, action) {
    if (action && handlers.hasOwnProperty(action.type)) {
      return handlers[action.type](state, action)
    } else {
      return state
    }
  }
}