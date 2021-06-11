import { ethers } from "ethers"
import { useContext } from "react"
import { Web3Context } from "web3-hooks"

const MetaMaskUsage = ({ state, dispatch }) => {
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
    let etherSend = ethers.utils.parseEther(amount.toString())
    dispatch({ type: "SEND_WAITING" })
    //setTxStatus("Waiting for confirmation")
    try {
      let tx = await web3State.signer.sendTransaction({
        to: address,
        value: etherSend,
      })
      dispatch({ type: "SEND_PENDING" })
      //setTxStatus("Pending")
      await tx.wait()
      dispatch({ type: "SEND_SUCCESS" })
      //setTxStatus("Success")
    } catch (error) {
      console.log(error.code)
      dispatch({ type: "SEND_FAILURE", payload: error })
    }
  }

  return (
    <>
      <div className="mb-3">
        {/* VOIR LES BALANCES */}
        <label htmlFor="balance-of" className="form-label">
          Voir la balance de l'adresse :
        </label>
        <input
          id="balance-of"
          type="text"
          className="form-control w-50"
          placeholder="0x000...000"
          onChange={(event) =>
            dispatch({ type: "CHANGE_ADDRESS", payload: event.target.value })
          }
          value={address}
        />
        <div className="form-text mb-3">{}</div>
        <div className="d-flex">
          <button
            onClick={handleClickGetBalance}
            className="btn btn-custom2 me-3"
          >
            Voir la balance
          </button>
          <button
            onClick={() =>
              dispatch({ type: "GET_BALANCE", payload: web3State.balance })
            }
            className="btn btn-custom2 me-3"
          >
            Voir ma balance
          </button>
          <div className="fs-5 p-0 my-auto">Balance : {ethBalance} ETH</div>
        </div>
      </div>
      <div className="mb-3">
        {/* ENVOYER DES ETHERS */}
        <label htmlFor="send-ether" className="form-label">
          Adresse à envoyer de l'ether :
        </label>
        <input
          id="send-ether"
          type="text"
          className="form-control w-50 mb-3"
          placeholder="0x000...000"
          onChange={(event) =>
            dispatch({ type: "CHANGE_ADDRESS", payload: event.target.value })
          }
          value={address}
        />
        <label htmlFor="amount" className="form-label">
          Montant :
        </label>
        <input
          id="amount"
          type="number"
          className="form-control w-50"
          onChange={(event) =>
            dispatch({ type: "SET_AMOUNT", payload: event.target.value })
          }
          value={amount}
        />
      </div>
      <div className="d-flex">
        <button
          onClick={handleClickSendEther}
          className="btn btn-custom1 me-3 align-self-center"
        >
          Envoyer
        </button>
        <div className={`fs-5 my-auto ${txStatusStyle} `}>{txStatus}</div>
      </div>
    </>
  )
}

export default MetaMaskUsage
