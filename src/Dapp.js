import { useContext, useReducer, useEffect } from "react"
import { Web3Context } from "web3-hooks"
import { metaMaskReducer } from "./reducers/metaMaskReducer"
import Counter from "./components/Counter"
import MetaMaskUsage from "./components/MetaMaskUsage"
import Header from "./components/Header"
import { useCounter } from "./contexts/CounterContext"

const Dapp = () => {
  const [web3State] = useContext(Web3Context)
  const counter = useCounter()

  const [state, dispatch] = useReducer(metaMaskReducer, {
    ethBalance: 0,
    address: "",
    amount: 0,
    txStatus: "",
    txStatusStyle: "alert alert-light",
    errorMessage: "",
  })

  useEffect(() => {
    dispatch({ type: "CHANGE_TX_STATUS" })
  }, [state.txStatus])

  return (
    <div className="App bg-custom min-vh-100">
      <Header />

      {/* MESSAGE D'INSTALLATION DE METAMASK */}
      <div className="container">
        {web3State.isMetaMask ? (
          ""
        ) : (
          <p className="fs-1 text-center">
            <b>/!\</b> Installer{" "}
            <a className="text-custom" href="https://metamask.io/">
              MetaMask
            </a>{" "}
            pour utiliser l'application.
          </p>
        )}
      </div>

      <div className="container">
        <h2 className="display-5 text-center text-lg-start">
          Utilisation de MetaMask
        </h2>
        <MetaMaskUsage state={state} dispatch={dispatch} />
      </div>

      {/* UTILISATION D'UN SMART CONTRACT */}
      <div className="border-top border-dark mt-3">
        <div className="container">
          <h2 className="display-5">Utilisation d'un Smart Contract</h2>
          <h3 className="">Counter.sol</h3>
          {!(web3State.chainId === 4) ? (
            <p className="alert alert-warning">
              Counter s'utilise avec le réseau Rinkeby
            </p>
          ) : counter ? (
            <Counter />
          ) : (
            <p className="alert">Le contrat n'est pas initialiser</p>
          )}
        </div>
      </div>

      {/* EXEMPLE DU COURS */}
    </div>
  )
}

export default Dapp
