import { useToken } from "../hooks/useToken"
import { web3State } from "web3-hooks"

const SuperbToken = () => {
  const [token, tokenState, tokenDispatch] = useToken()
  const { tokenBalance } = tokenState

  const handleTokenUpdate = async () => {
    try {
      let balance = await token.balanceOf(web3State.address)
      tokenDispatch({ type: "UPDATE_BALANCE", payload: balance.toString() })
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="mb-3">
      <div className="d-flex">
        <p className="fs-3 me-4">Votre balance : {tokenBalance}</p>
        <button onClick={handleTokenUpdate} className="btn btn-custom2">
          Rafraîchir
        </button>
      </div>
    </div>
  )
}

export default SuperbToken
