import { ethers } from "ethers"

export const tokenReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_BALANCE":
      return {
        ...state,
        tokenBalance: ethers.utils.formatEther(action.payload),
        tokenStatus: "",
      }
    case "AMOUNT_CHANGE":
      return {
        ...state,
        amount: action.payload,
      }
    case "CHANGE_ADDRESS":
      return {
        ...state,
        address: action.payload,
      }
    case "TOKEN_WAITING":
      return {
        ...state,
        tokenStatus: "Waiting for confirmation",
      }

    case "TOKEN_PENDING":
      return {
        ...state,
        tokenStatus: "Pending",
      }

    case "TOKEN_SUCCESS":
      return {
        ...state,
        tokenStatus: `Success! Transfer ${
          state.amount
        } from ${state.sender.slice(0, 7)}... to ${state.recipient.slice(
          0,
          7
        )}...`,
      }

    case "TOKEN_FAILURE":
      let failureMessage
      if (action.payload.code === 4001) {
        failureMessage = "Transaction rejected"
      } else if (action.payload.code === "INSUFFICIENT_FUNDS") {
        failureMessage = "Insufficient Funds"
      } else {
        failureMessage = `Failed with ${action.payload.message}`
      }
      return { ...state, tokenStatus: failureMessage }
    case "TX_STATUS":
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
      console.log("useEffect status :" + state.tokenStatus)
      if (state.tokenStatus.startsWith("Failed")) {
        style = statusStyle("Failed")
      } else {
        style = statusStyle(state.tokenStatus)
      }
      console.log("useEffect style" + style)
      return { ...state, statusStyle: style }
    case "DISPLAY_EVENT":
      return {
        ...state,
        sender: action.sender,
        recipient: action.recipient,
        amount: action.amount,
      }
    default:
      throw new Error(
        `tokenIcoReducer: wrong input in the reducer ${action.type}`
      )
  }
}
