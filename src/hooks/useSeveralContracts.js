import { useContext, useEffect, useReducer } from "react"
import { ContractsContext } from "../contexts/ContractsContext"
import { calculetteReducer } from "../reducers/calculetteReducer"
import { counterReducer } from "../reducers/counterReducer"
import { tokenReducer } from "../reducers/tokenReducer"

// hooks
export const useSeveralContracts = () => {
  const [counter, token, calculette] = useContext(ContractsContext)

  // COUNTER REDUCER
  const [counterState, counterDispatch] = useReducer(counterReducer, {
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
    counterDispatch({ type: "CHANGE_TX_STATUS" })
  }, [counterState.counterStatus])

  // TOKEN REDUCER
  const [tokenState, tokenDispatch] = useReducer(tokenReducer, {
    tokenBalance: 0,
    amount: 0,
    address: "",
    tokenStatus: "",
    statusStyle: "alert alert-light",
  })

  useEffect(() => {
    tokenDispatch({ type: "TX_STATUS" })
  }, [tokenState.tokenStatus])

  // CALCULETTE REDUCER
  const [calcState, calcDispatch] = useReducer(calculetteReducer, {
    number1: 0,
    number2: 0,
    operator: "+",
    creditBalance: 0,
    amount: 0,
    approved: false,
    rate: 8,
  })

  if (counter === undefined || token === undefined) {
    throw new Error(
      `It seems that you are trying to use GradientContext outside of its provider`
    )
  }
  return [
    counter,
    counterState,
    counterDispatch,
    token,
    tokenState,
    tokenDispatch,
    calculette,
    calcState,
    calcDispatch,
  ]
}
