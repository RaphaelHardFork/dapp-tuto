import { createContext } from "react"
import { useContract } from "web3-hooks"
import { counterAddress, counterAbi } from "../contracts/Counter"
import { tokenAddress, tokenAbi } from "../contracts/SuperbToken"
import { calculetteAddress, calculetteAbi } from "../contracts/Calculette"

export const ContractsContext = createContext(null)

const ContractsContextProvider = ({ children }) => {
  const counter = useContract(counterAddress, counterAbi)
  const token = useContract(tokenAddress, tokenAbi)
  const calculette = useContract(calculetteAddress, calculetteAbi)

  return (
    <>
      <ContractsContext.Provider value={[counter, token, calculette]}>
        {children}
      </ContractsContext.Provider>
    </>
  )
}

export default ContractsContextProvider
