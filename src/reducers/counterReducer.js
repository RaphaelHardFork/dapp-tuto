export const counterReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return {
        ...state,
        count: action.count,
        step: action.step,
        counterStatus: "",
      }

    case "UPDATE_FAILURE":
      return {
        ...state,
        errorMessage: action.payload.message,
      }

    case "COUNT_WAITING":
      return {
        ...state,
        counterStatus: "Waiting for confirmation",
      }

    case "COUNT_PENDING":
      return {
        ...state,
        counterStatus: "Pending",
      }

    case "COUNT_SUCCESS":
      return {
        ...state,
        count: action.payload,
        counterStatus: "Success",
      }

    case "COUNT_FAILURE":
      let failureMessage
      if (action.payload.code === 4001) {
        failureMessage = "Transaction rejected"
      } else if (action.payload.code === "INSUFFICIENT_FUNDS") {
        failureMessage = "Insufficient Funds"
      } else {
        failureMessage = `Failed with ${action.payload.message}`
      }

      return {
        ...state,
        counterStatus: failureMessage,
      }

    case "CHANGE_ADDRESS":
      return {
        ...state,
        ownerList: action.payload,
      }

    case "IS_OWNER":
      return {
        ...state,
        isOwner: action.onList,
        nbOperation: action.remainingOp,
      }

    case "CHANGE_TX_STATUS":
      const statusStyle = (CountStat) => {
        switch (CountStat) {
          case "":
            return ""
          case "Waiting for confirmation":
            return "alert alert-warning"
          case "Pending":
            return "alert alert-warning"
          case "Success":
            return "alert alert-success"
          case "Failed":
            return "alert alert-danger"
          case "Transaction rejected":
            return "alert alert-danger"
          case "Insufficient Funds":
            return "alert alert-danger"
          default:
            return "alert alert-dark"
        }
      }
      let style
      if (state.counterStatus.startsWith("Failed")) {
        style = statusStyle("Failed")
      } else {
        style = statusStyle(state.counterStatus)
      }
      return {
        ...state,
        counterStatusStyle: style,
      }
    default:
      throw new Error(
        `counterReducer: wrong input in the reducer ${action.type}`
      )
  }
}
