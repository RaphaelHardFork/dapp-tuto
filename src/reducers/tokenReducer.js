export const tokenReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BALANCE":
      return {
        ...state,
        tokenBalance: action.payload,
      }
    default:
      throw new Error(
        `tokenIcoReducer: wrong input in the reducer ${action.type}`
      )
  }
}
