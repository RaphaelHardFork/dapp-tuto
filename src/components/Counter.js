import { useState } from "react"
import { useSeveralContracts } from "../hooks/useSeveralContracts"

import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  Alert,
  AlertIcon,
  InputGroup,
  Spacer,
} from "@chakra-ui/react"

const Counter = () => {
  const [counter, counterState, counterDispatch] = useSeveralContracts()
  const {
    count,
    step,
    counterStatus,
    ownerList,
    counterStatusStyle,
    isOwner,
    nbOperation,
  } = counterState

  const [number, setNumber] = useState(0)

  const handleUpdateCount = async () => {
    try {
      const updatedCount = await counter.counter()
      const updatedStep = await counter.step()
      counterDispatch({
        type: "UPDATE",
        count: updatedCount.toString(),
        step: updatedStep.toString(),
      })
    } catch (e) {
      counterDispatch({ type: "UPDATE_FAILURE", payload: e })
      console.log(e)
    }
  }

  const handleChangeCount = async (nb) => {
    console.log(counterStatusStyle)
    counterDispatch({ type: "COUNT_WAITING" })
    try {
      let tx
      switch (nb) {
        case 1:
          tx = await counter.increment()
          break
        case 2:
          tx = await counter.decrement()
          break
        case 3:
          tx = await counter.reset()
          break
        default:
          tx = 0
      }
      counterDispatch({ type: "COUNT_PENDING" })
      await tx.wait()
      let updatedCount = await counter.counter()
      counterDispatch({
        type: "COUNT_SUCCESS",
        payload: updatedCount.toString(),
      })
    } catch (e) {
      console.log(e)
      counterDispatch({ type: "COUNT_FAILURE", payload: e })
    }
  }

  const handleCheckAddress = async () => {
    console.log(isOwner)
    try {
      let check = await counter.isOwners(ownerList)
      let remainingOp = await counter.nbOperation(ownerList)
      counterDispatch({
        type: "IS_OWNER",
        onList: check,
        remainingOp: remainingOp.toString(),
      })
    } catch (e) {
      console.log(e)
    }
  }

  const handleChangeStep = async () => {
    counterDispatch({ type: "COUNT_WAITING" })
    try {
      let tx = await counter.setStep(number)
      counterDispatch({ type: "COUNT_PENDING" })
      const updatedCount = await counter.counter()
      await tx.wait()
      counterDispatch({
        type: "COUNT_SUCCESS",
        payload: updatedCount.toString(),
      })
    } catch (e) {
      console.log(e)
      counterDispatch({ type: "COUNT_FAILURE", payload: e })
    }
  }

  return (
    <>
      <Flex>
        <Box
          mx={{ base: "auto", xl: "0" }}
          my="1.2rem"
          textAlign={{ base: "center", xl: "start" }}
          shadow="md"
          borderRadius="2rem"
          p="2rem"
          bgGradient="linear(45deg,#FFFFFF,#BBffff)"
        >
          <Text fontSize="1.5rem" fontFamily="Playfair Display" as="p">
            Count: <b>{count}</b> Step: <b>{step}</b>
          </Text>
        </Box>
      </Flex>
      {counterStatus && (
        <Alert
          status={!!counterStatusStyle ? counterStatusStyle : "info"}
          my="1rem"
        >
          <AlertIcon />
          {counterStatus}
        </Alert>
      )}

      <Flex mb="1rem">
        <Box>
          <Button
            _hover={{ backgroundColor: "#7d0e00" }}
            bg="#ec7133"
            color="white"
            onClick={handleUpdateCount}
          >
            Rafraîchir
          </Button>
        </Box>
        <Spacer />
        <Box>
          <Button
            me="1rem"
            _hover={{ backgroundColor: "#7d0e00" }}
            bg="#ec7133"
            color="white"
            onClick={() => handleChangeCount(1)}
          >
            <b>+</b>
          </Button>
          <Button
            me="1rem"
            _hover={{ backgroundColor: "#ec7133" }}
            bg="#7d0e00"
            color="white"
            onClick={() => handleChangeCount(3)}
          >
            <b>Reset</b>
          </Button>
          <Button
            _hover={{ backgroundColor: "#7d0e00" }}
            bg="#ec7133"
            color="white"
            onClick={() => handleChangeCount(2)}
          >
            <b>-</b>
          </Button>
        </Box>
        <Spacer />
        <Box>
          <InputGroup>
            <Input
              value={number}
              onChange={(event) => setNumber(event.target.value)}
              borderEndRadius="0"
              aria-label="step-number"
              type="number"
              bg="white"
              w="5rem"
            />
            <Button
              borderStartRadius="0"
              _hover={{ backgroundColor: "#ec7133" }}
              bg="#7d0e00"
              color="white"
              onClick={handleChangeStep}
            >
              Changer le step
            </Button>
          </InputGroup>
        </Box>
      </Flex>
      <Flex>
        <Text me="1rem" my="auto" htmlFor="is-owner" as="label">
          Tapez votre adresse pour voir si vous êtes sur la liste :
        </Text>
        <Input
          borderEndRadius="0"
          bg="white"
          maxW="25rem"
          placeholder="0x0000...000"
          id="is-owner"
          type="text"
          onChange={(event) =>
            counterDispatch({
              type: "CHANGE_ADDRESS",
              payload: event.target.value,
            })
          }
        />
        <Button
          borderStartRadius="0"
          onClick={handleCheckAddress}
          _hover={{ background: "#000000", color: "white" }}
          bg="#76ffff"
          transition="0.3s"
        >
          Check
        </Button>
      </Flex>
      {isOwner ? (
        <Alert status="success" my="1rem">
          <AlertIcon />
          Vous êtes sur la liste, vous pouvez utiliser "Reset"
        </Alert>
      ) : (
        <Alert status="error" my="1rem">
          <AlertIcon />
          Vous n'êtes pas sur la liste (il vous reste {10 - nbOperation}
          opération pour y être).
        </Alert>
      )}
    </>
  )
}

export default Counter
