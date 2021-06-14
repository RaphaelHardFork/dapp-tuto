import Dapp from "./Dapp"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"
import CounterContextProvider from "./contexts/CounterContext"
import TokenContextProvider from "./contexts/TokenContext"

const App = () => {
  return (
    <>
      <CounterContextProvider>
        <Dapp />
      </CounterContextProvider>
    </>
  )
}

export default App
