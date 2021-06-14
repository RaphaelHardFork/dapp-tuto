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
        buyStatus: "",
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
    case "BUY_WAINTING":
      return {
        ...state,
        buyStatus: "Waiting for confirmation",
      }
    case "BUY_PENDING":
      return {
        ...state,
        buyStatus: "Pending",
      }
    case "BUY_SUCCESS":
      return {
        ...state,
        buyStatus: "Success",
      }
    case "BUY_FAILURE":
      return {
        ...state,
        buyStatus: `Failed with ${action.payload.message}`,
      }
    default:
      throw new Error(
        `calculetteReducer: wrong input in the reducer ${action.type}`
      )
  }
}
