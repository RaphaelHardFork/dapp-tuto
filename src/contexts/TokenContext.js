import { createContext } from "react"
import { useContract } from "web3-hooks"
import { tokenAddress, tokenAbi } from "../contracts/SuperbToken"

export const TokenContext = createContext(null)

const TokenContextProvider = ({ children }) => {
  const tokenContract = useContract(tokenAbi, tokenAddress)

  return (
    <>
      <TokenContext.Provider value={tokenContract}>
        {children}
      </TokenContext.Provider>
    </>
  )
}

export default TokenContextProvider
