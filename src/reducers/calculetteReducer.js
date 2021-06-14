export const calculetteReducer = (state, action) => {
  switch (action.type) {
    case "SET_OPERATOR":
      return {
        ...state,
        operator: action.payload,
      }
    case "CHANGE_NUMBER1":
      return {
        ...state,
        number1: action.payload,
      }
    case "CHANGE_NUMBER2":
      return {
        ...state,
        number2: action.payload,
      }
    case "UPDATE_CREDIT":
      return {
        ...state,
        creditBalance: action.payload,
      }
    case "IS_APPROVED":
      let approvedCheck
      if (action.payload === 0) {
        approvedCheck = false
      } else {
        approvedCheck = true
      }
      return {
        ...state,
        approved: approvedCheck,
      }
    default:
      throw new Error(
        `calculetteReducer: wrong input in the reducer ${action.type}`
      )
  }
}
