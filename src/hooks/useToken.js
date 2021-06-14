import { useContext, useReducer } from "react"
import { TokenContext } from "../contexts/TokenContext"
import { tokenReducer } from "../reducers/tokenReducer"

export const useToken = () => {
  const [state, dispatch] = useReducer(tokenReducer, {
    tokenBalance: 0,
  })

  const context = useContext(TokenContext)
  if (context === undefined) {
    throw new Error(
      `It seems that you are trying to use GradientContext outside of its provider`
    )
  }
  return [context, state, dispatch]
}
