import { ethers } from "ethers"
import { useContext, useEffect } from "react"
import { Web3Context } from "web3-hooks"
import { useSeveralContracts } from "../hooks/useSeveralContracts"
import { useToast } from "@chakra-ui/react"

const SuperbToken = () => {
  const toast = useToast()

  const [web3State] = useContext(Web3Context)
  const [, , , token, tokenState, tokenDispatch] = useSeveralContracts()
  const {
    tokenBalance,
    amount,
    address,
    tokenStatus,
    statusStyle,
    sender,
    recipient,
  } = tokenState

  const handleTokenUpdate = async () => {
    try {
      let balance = await token.balanceOf(web3State.account)
      tokenDispatch({ type: "UPDATE_BALANCE", payload: balance.toString() })
    } catch (e) {
      console.log(e)
    }
  }

  const handleSendToken = async () => {
    tokenDispatch({ type: "TOKEN_WAITING" })
    try {
      let tx = await token.transfer(address, ethers.utils.parseEther(amount))
      tokenDispatch({ type: "TOKEN_PENDING" })
      await tx.wait()
      tokenDispatch({ type: "TOKEN_SUCCESS", sender, recipient, amount })
    } catch (e) {
      tokenDispatch({ type: "TOKEN_FAILURE", payload: e })
    }
  }

  useEffect(() => {
    if (token) {
      // param de l'event
      const cb = (sender, recipient, amount) => {
        tokenDispatch({ type: "DISPLAY_EVENT", sender, recipient, amount })
        if (sender.toLowerCase() === web3State.account.toLowerCase()) {
          toast({
            title: "Event DataSet",
            description: `${sender} set storage with value: ${amount}`,
            status: "info",
            position: "top-right",
            duration: 9000,
            isClosable: true,
          })
        }
      }
      // ecouter l'event
      token.on("Transfer", cb)
      return () => token.off("Transfer", cb)
    }
  }, [token, web3State.account, toast, tokenDispatch])

  //DEBUG
  const debug = () => {
    toast({})
  }

  return (
    <div className="mb-3">
      <div className="d-flex align-items-center mb-3">
        <p className="fs-4 me-4 my-0 p-0">Votre balance : {tokenBalance} SBT</p>
        <button onClick={handleTokenUpdate} className="btn btn-custom2">
          Rafraîchir
        </button>
      </div>
      <div className="d-flex align-items-center mb-3">
        <label htmlFor="send-token" className="form-label me-3 my-0">
          Envoyer :
        </label>
        <input
          onChange={(event) =>
            tokenDispatch({
              type: "AMOUNT_CHANGE",
              payload: event.target.value,
            })
          }
          value={amount}
          id="send-token"
          type="number"
          className="form-control w-25 me-3"
        />
        <label htmlFor="recipient-address" className="form-label me-3 my-0">
          à :
        </label>
        <input
          onChange={(event) =>
            tokenDispatch({
              type: "CHANGE_ADDRESS",
              payload: event.target.value,
            })
          }
          value={address}
          id="recipient-address"
          type="text"
          className="form-control w-25 me-3"
          placeholder="0x000...0000"
        />
        <button onClick={handleSendToken} className="btn btn-custom1">
          Envoyer
        </button>
      </div>
      <div className="d-flex mb-3">
        <label htmlFor="address-approve" className="form-label">
          Approuver une adresse :
        </label>
        <input
          id="address-approve"
          type="text"
          className="form-control me-3"
          placeholder="0x000...000"
        />
        <button onClick={debug} className="btn btn-custom1">
          Console.log
        </button>
      </div>

      {tokenStatus && <div className={statusStyle}>{tokenStatus}</div>}
    </div>
  )
}

export default SuperbToken
