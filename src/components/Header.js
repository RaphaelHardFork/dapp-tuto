import { useContext } from "react"
import { Web3Context } from "web3-hooks"
import {
  Box,
  Flex,
  Spacer,
  Heading,
  Container,
  Text,
  Button,
  Link,
} from "@chakra-ui/react"
import { FaGithub } from "react-icons/fa"

const Header = ({ isConnected, setModal }) => {
  const [web3State, login] = useContext(Web3Context)

  const networkStyle = (network) => {
    switch (network) {
      case "Mainnet":
        return "#29B6AF"
      case "Rinkeby":
        return "#F6C343"
      case "Ropsten":
        return "#FF4A8D"
      case "Kovan":
        return "#9064FF"
      case "Goerli":
        return "#3099F2"
      default:
        return "#000000"
    }
  }

  return (
    <>
      <Box borderColor="dark" borderBottom="1px">
        <Heading
          fontSize="4rem"
          fontFamily="Playfair Display"
          textAlign="center"
          as="h1"
          py="2rem"
        >
          Hello Hard Fork Dapp
        </Heading>
      </Box>
      <Spacer />
      <Box borderColor="dark" borderBottom="1px">
        <Container maxWidth="90%" my="1rem">
          <Flex
            alignItems="center"
            justifyContent="center"
            flexDirection={{ base: "column", xl: "row" }}
          >
            <Box mb={{ base: "0.75rem", xl: "0rem" }} textAlign="center">
              <Text fontSize="1.5rem">
                Network :{" "}
                <Text color={networkStyle(web3State.networkName)} as="b">
                  {web3State.networkName} (chainID: {web3State.chainId})
                </Text>{" "}
              </Text>
            </Box>
            <Spacer />
            <Flex
              alignItems="center"
              mb={{ base: "0.75rem", xl: "0rem" }}
              textAlign="center"
            >
              {isConnected(web3State.account) ? (
                <Button
                  _hover={{ background: "#769955", color: "white" }}
                  bg="#76ffff"
                  me="1rem"
                  transition="0.3s"
                  onClick={() => setModal(true)}
                >
                  Donate
                </Button>
              ) : (
                <Button
                  _hover={{ background: "#769955", color: "white" }}
                  bg="#76ffff"
                  me="1rem"
                  transition="0.3s"
                  onClick={login}
                >
                  Login
                </Button>
              )}
              <Text as="b" me="1rem" my="auto">
                Voir le code :{" "}
              </Text>
              <Link
                _hover={{ textDecoration: "none", color: "white" }}
                href="https://github.com/RaphaelHardFork/dapp-tuto/tree/contractsContext"
                isExternal
              >
                <Button
                  _hover={{ background: "#769955" }}
                  bg="#76ffff"
                  leftIcon={<FaGithub />}
                >
                  Github
                </Button>
              </Link>
            </Flex>
            <Spacer />
            <Flex
              mb={{ base: "0.75rem", xl: "0rem" }}
              justifyContent="center"
              flexDirection="row"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fab"
                data-icon="ethereum"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
                className=" fa-ethereum fa-w-1 me-3"
                width="1rem"
              >
                <path
                  fill={networkStyle(web3State.networkName)}
                  d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"
                ></path>
              </svg>
              <p className="my-auto">{web3State.account}</p>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </>
  )
}

export default Header
