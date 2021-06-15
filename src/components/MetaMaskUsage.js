import { ethers } from "ethers"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import {
  Box,
  Input,
  Button,
  Text,
  Flex,
  Alert,
  AlertIcon,
} from "@chakra-ui/react"

const MetaMaskUsage = ({ state, dispatch, isConnected }) => {
  const [web3State] = useContext(Web3Context)
  const { ethBalance, address, amount, txStatus, txStatusStyle } = state

  const handleClickGetBalance = async () => {
    try {
      let balance = await web3State.provider.getBalance(address)
      dispatch({
        type: "GET_BALANCE",
        payload: ethers.utils.formatEther(balance),
      })
    } catch (e) {
      dispatch({ type: "GET_BALANCE_FAILURE", payload: e })
    }
  }

  const handleClickSendEther = async () => {
    //debug
    console.log(txStatusStyle)

    let etherSend = ethers.utils.parseEther(amount.toString())
    dispatch({ type: "SEND_WAITING" })
    try {
      let tx = await web3State.signer.sendTransaction({
        to: address,
        value: etherSend,
      })
      dispatch({ type: "SEND_PENDING" })
      await tx.wait()
      dispatch({ type: "SEND_SUCCESS" })
    } catch (error) {
      dispatch({ type: "SEND_FAILURE", payload: error })
    }
  }

  return (
    <>
      <Box>
        {/* VOIR LES BALANCES */}
        <Box textAlign={{ base: "center", xl: "start" }} mb="1rem">
          <Text me="1rem" htmlFor="balance-of" as="label">
            Voir la balance de l'adresse :
          </Text>
          <Input
            bg="white"
            disabled={!isConnected(web3State.account)}
            placeholder={
              isConnected(web3State.account)
                ? "0x000...000"
                : "Connectez votre métamask"
            }
            onChange={(event) =>
              dispatch({ type: "CHANGE_ADDRESS", payload: event.target.value })
            }
            value={address}
            w="25%"
            id="balance-of"
          />
        </Box>
        <Flex mb="1rem" justifyContent={{ base: "center", xl: "start" }}>
          <Button
            _hover={{ backgroundColor: "#ec7133" }}
            bg="#7d0e00"
            color="white"
            disabled={!isConnected(web3State.account)}
            onClick={handleClickGetBalance}
            me="1rem"
          >
            Voir la balance
          </Button>
          <Button
            _hover={{ backgroundColor: "#ec7133" }}
            bg="#7d0e00"
            color="white"
            disabled={!isConnected(web3State.account)}
            onClick={() =>
              dispatch({ type: "GET_BALANCE", payload: web3State.balance })
            }
            me="1rem"
          >
            Voir ma balance
          </Button>
          <Text fontSize="1.25rem" my="auto">
            Balance : {ethBalance} ETH
          </Text>
        </Flex>
      </Box>
      <Flex flexDirection="column">
        {/* ENVOYER DES ETHERS */}
        <Box textAlign={{ base: "center", xl: "start" }} mb="1rem">
          <Text me="1rem" htmlFor="send-ether" as="label">
            Adresse à envoyer de l'ether :
          </Text>
          <Input
            bg="white"
            disabled={!isConnected(web3State.account)}
            placeholder={
              isConnected(web3State.account)
                ? "0x000...000"
                : "Connectez votre métamask"
            }
            onChange={(event) =>
              dispatch({ type: "CHANGE_ADDRESS", payload: event.target.value })
            }
            value={address}
            w="25%"
            id="send-ether"
          />
        </Box>
        <Box textAlign={{ base: "center", xl: "start" }} mb="1rem">
          <Text me="1rem" htmlFor="amount" as="label">
            Montant :
          </Text>
          <Input
            type="number"
            bg="white"
            disabled={!isConnected(web3State.account)}
            placeholder={
              isConnected(web3State.account)
                ? "0x000...000"
                : "Connectez votre métamask"
            }
            onChange={(event) =>
              dispatch({ type: "SET_AMOUNT", payload: event.target.value })
            }
            value={amount}
            w="25%"
            id="amount"
          />
        </Box>
        <Box textAlign={{ base: "center", xl: "start" }}>
          <Button
            _hover={{ backgroundColor: "#7d0e00" }}
            bg="#ec7133"
            color="white"
            disabled={!isConnected(web3State.account)}
            onClick={handleClickSendEther}
            mb="1rem"
          >
            Envoyer
          </Button>
          {!!txStatus && (
            <Alert status={!!txStatusStyle ? txStatusStyle : "info"}>
              <AlertIcon />
              {txStatus}
            </Alert>
          )}
        </Box>
      </Flex>
    </>
  )
}

export default MetaMaskUsage
