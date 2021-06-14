import { useContext, useReducer, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { metaMaskReducer } from "./reducers/metaMaskReducer"
import Counter from "./components/Counter"
import MetaMaskUsage from "./components/MetaMaskUsage"
import Calculette from "./components/Calculette"
import Header from "./components/Header"
import SuperbToken from "./components/SuperbToken"
import { useSeveralContracts } from "./hooks/useSeveralContracts"
import { ethers } from "ethers"
import Modal from "./components/Modal"

const Dapp = () => {
  const [web3State] = useContext(Web3Context)
  const [counter, , , token, , , calculette] = useSeveralContracts()

  const [modal, setModal] = useState(false)

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

  function isConnected(account) {
    if (account === ethers.constants.AddressZero) {
      return false
    } else {
      return true
    }
  }

  return (
    <>
      <Modal modal={modal} setModal={setModal} />
      <div className="App bg-custom min-vh-100">
        <Header setModal={setModal} isConnected={isConnected} />

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

        {/* UTILISATION DE METAMASK */}
        <div className="container">
          <h2 className="display-5 text-center text-lg-start">
            Utilisation de MetaMask
          </h2>
          <MetaMaskUsage
            isConnected={isConnected}
            state={state}
            dispatch={dispatch}
          />
        </div>

        {/* UTILISATION D'UN SMART CONTRACT */}
        <div className="border-top border-dark mt-3">
          <div className="container">
            <h2 className="display-5">Utilisation d'un Smart Contract</h2>

            {/* COUNTER */}
            <div className="mb-3">
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

            {/* SUPERBTOKEN */}
            <div className="mb-3">
              <h3>SuperbToken.sol</h3>
              {!(web3State.chainId === 4) ? (
                <p className="alert alert-warning">
                  SuperbToken s'utilise avec le réseau Rinkeby
                </p>
              ) : token ? (
                <SuperbToken />
              ) : (
                <p className="alert">Le contrat n'est pas initialiser</p>
              )}
            </div>

            {/* CALCULETTE */}
            <div className="mb-3">
              <h3>Calculette.sol</h3>
              {!(web3State.chainId === 4) ? (
                <p className="alert alert-warning">
                  Calculette s'utilise avec le réseau Rinkeby
                </p>
              ) : calculette ? (
                <Calculette />
              ) : (
                <p className="alert">Le contrat n'est pas initialiser</p>
              )}
            </div>
          </div>
        </div>

        {/* EXEMPLE DU COURS */}
        <footer
          style={{ opacity: 0.7 }}
          className="bg-dark text-white text-center p-3 mt-auto"
        >
          &#169; Raphael
        </footer>
      </div>
    </>
  )
}

export default Dapp
