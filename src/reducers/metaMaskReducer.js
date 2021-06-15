export const metaMaskReducer = (state, action) => {
  switch (action.type) {
    case "GET_BALANCE":
      return {
        ...state,
        ethBalance: action.payload,
        txStatus: "",
      }
    case "GET_BALANCE_FAILURE":
      return {
        ...state,
        errorMessage: action.payload,
      }
    case "SET_AMOUNT":
      return {
        ...state,
        amount: action.payload,
      }
    case "SEND_WAITING":
      return {
        ...state,
        txStatus: "Waiting for confirmation",
      }
    case "SEND_PENDING":
      return {
        ...state,
        txStatus: "Pending",
      }
    case "SEND_SUCCESS":
      return {
        ...state,
        txStatus: "Success",
      }
    case "SEND_FAILURE":
      let statusMessage
      if (action.payload.code === 4001) {
        statusMessage = "Transaction rejected"
      } else if (action.payload.code === "INSUFFICIENT_FUNDS") {
        statusMessage = "Insufficient Funds"
      } else {
        statusMessage = `Failed with ${action.payload.message}`
      }
      return {
        ...state,
        txStatus: statusMessage,
      }
    case "CHANGE_TX_STATUS":
      let style
      const txStyle = (txStat) => {
        switch (txStat) {
          case "":
            return ""
          case "Waiting for confirmation":
            return "info"
          case "Pending":
            return "warning"
          case "Success":
            return "success"
          case "Failed":
            return "error"
          case "Transaction rejected":
            return "error"
          case "Insufficient Funds":
            return "error"
          default:
            return "info"
        }
      }
      if (state.txStatus.startsWith("Failed")) {
        style = txStyle("Failed")
      } else {
        style = txStyle(state.txStatus)
      }
      return {
        ...state,
        txStatusStyle: style,
      }
    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      }
    default:
      throw new Error(
        `metaMaskReducer: wrong input in the reducer (${action.type})`
      )
  }
}
