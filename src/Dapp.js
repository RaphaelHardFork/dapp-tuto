// libs
import { ethers } from "ethers"

// react & custom hooks
import { useContext, useReducer, useEffect, useState } from "react"
import { Web3Context } from "web3-hooks"
import { useSeveralContracts } from "./hooks/useSeveralContracts"

// reducers
import { metaMaskReducer } from "./reducers/metaMaskReducer"

// components
import Counter from "./components/Counter"
import MetaMaskUsage from "./components/MetaMaskUsage"
import Calculette from "./components/Calculette"
import Header from "./components/Header"
import SuperbToken from "./components/SuperbToken"
import Modal from "./components/Modal"

// chakra components
import { Box, Container, Heading, Alert, AlertIcon } from "@chakra-ui/react"

const Dapp = () => {
  const [web3State] = useContext(Web3Context)
  const [counter, , , token, , , calculette] = useSeveralContracts()

  const [modal, setModal] = useState(false)

  const [state, dispatch] = useReducer(metaMaskReducer, {
    ethBalance: 0,
    address: "",
    amount: 0,
    txStatus: "",
    txStatusStyle: "info",
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
      <Box bgGradient="linear(45deg,#FFFFFF,#fddfc9)" minHeight="100vh">
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
        <Box p="1rem" borderBottom="1px">
          <Container mt="1rem" maxW="90%">
            <Heading
              textAlign={{ base: "center", xl: "start" }}
              as="h2"
              fontSize="3rem"
              fontWeight="light"
              fontFamily="sans-serif"
            >
              Utilisation de MetaMask
            </Heading>
            <MetaMaskUsage
              isConnected={isConnected}
              state={state}
              dispatch={dispatch}
            />
          </Container>
        </Box>

        {/* UTILISATION D'UN SMART CONTRACT */}
        <Box p="1rem" borderBottom="1px">
          <Container mt="1rem" maxW="90%">
            <Heading
              textAlign={{ base: "center", xl: "start" }}
              as="h2"
              fontSize="3rem"
              fontWeight="light"
              fontFamily="sans-serif"
            >
              Utilisation d'un Smart Contract
            </Heading>

            {/* COUNTER */}
            <Heading
              textAlign={{ base: "center", xl: "start" }}
              as="h3"
              fontSize="1.5rem"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              Counter.sol
            </Heading>
            {!(web3State.chainId === 4) ? (
              <Alert status="warning">
                <AlertIcon />
                Counter s'utilise avec le réseau Rinkeby
              </Alert>
            ) : counter ? (
              <Counter />
            ) : (
              <Alert status="error">
                <AlertIcon />
                Le contrat n'est pas initialiser{" "}
              </Alert>
            )}

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
          </Container>
        </Box>

        {/* EXEMPLE DU COURS */}
        <footer
          style={{ opacity: 0.7 }}
          className="bg-dark text-white text-center p-3 mt-auto"
        >
          &#169; Raphael
        </footer>
      </Box>
    </>
  )
}

export default Dapp
