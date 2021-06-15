import Dapp from "./Dapp"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import ContractsContextProvider from "./contexts/ContractsContext"

const App = () => {
  return (
    <>
      <ContractsContextProvider>
        <Dapp />
      </ContractsContextProvider>
    </>
  )
}

export default App
