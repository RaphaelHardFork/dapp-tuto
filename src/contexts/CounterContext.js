import { createContext, useContext, useEffect, useReducer } from "react"
import { useContract } from "web3-hooks"
import { counterAddress, counterAbi } from "../contracts/Counter"
import { counterReducer } from "../reducers/counterReducer"

const CounterContext = createContext(null)

const CounterContextProvider = ({ children }) => {
  const counter = useContract(counterAddress, counterAbi)

  return (
    <>
      <CounterContext.Provider value={counter}>
        {children}
      </CounterContext.Provider>
    </>
  )
}

export const useCounter = () => {
  const [state, dispatch] = useReducer(counterReducer, {
    count: 0,
    step: 0,
    counterStatus: "",
    ownerList: "",
    isOwner: false,
    counterStatusStyle: "alert alert-light",
    errorMessage: "",
    nbOperation: 0,
  })

  useEffect(() => {
    dispatch({ type: "CHANGE_TX_STATUS" })
  }, [state.counterStatus])

  const context = useContext(CounterContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use GradientContext outside of its provider`
    )
  }
  return [context, state, dispatch]
}

export default CounterContextProvider
