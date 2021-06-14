import { ethers } from "ethers"
import { useContext, useEffect } from "react"
import { Web3Context } from "web3-hooks"
import { useSeveralContracts } from "../hooks/useSeveralContracts"

const Calculette = () => {
  const [web3State] = useContext(Web3Context)
  const [, , , token, , , calculette, calcState, calcDispatch] =
    useSeveralContracts()

  const {
    number1,
    number2,
    operator,
    amount,
    creditBalance,
    approved,
    rate,
    buyStatus,
  } = calcState

  const displayOp = "+-x/%".split("")

  const handleUpdateCredits = async () => {
    try {
      let balance = await calculette.creditsBalanceOf(web3State.account)
      calcDispatch({ type: "UPDATE_CREDIT", payload: balance.toString() })
    } catch (e) {
      console.log(e)
    }
  }

  const handleApproveCalc = async () => {
    try {
      let tx = await token.approve(
        calculette.address,
        ethers.utils.parseEther("100000000")
      )
    } catch (e) {}
  }

  const handleBuyCredit = async () => {
    calcDispatch({ type: "BUY_WAINTING" })
    try {
      calcDispatch({ type: "BUY_PENDING" })
      let tx = await calculette.buyCredits(100)
      await tx.wait()
      calcDispatch({ type: "BUY_SUCCESS" })
    } catch (e) {
      console.log(e)
      calcDispatch({ type: "BUY_FAILURE", payload: e })
    }
  }

  useEffect(() => {
    const approveUpdate = async () => {
      try {
        let approvedCheck = await token.allowance(
          calculette.address,
          web3State.account
        )
        console.log(approvedCheck)
        calcDispatch({ type: "IS_APPROVED", payload: approvedCheck })
      } catch (e) {
        console.log("useEffect " + e)
      }
    }
    approveUpdate()
    console.log("account approved: " + approved)
    console.log(calculette)
  }, [web3State.account, token, calculette, calcDispatch])

  return (
    <div className="">
      <p className="fs-5">{!!calculette && calculette.address}</p>
      {approved ? (
        <>
          <div className="mb-3 d-flex w-50 align-items-center">
            <label htmlFor="buy-credits" className="form-label my-0">
              1 SBT = 8 crédits
            </label>
            <input type="number" className="form-control me-3" />
            <button
              onClick={handleBuyCredit}
              className="btn btn-custom2 d-inline-block h-25 me-3"
            >
              Acheter des crédits
            </button>
          </div>
          {buyStatus && (
            <div className="alert alert-light my-0">{buyStatus}</div>
          )}
        </>
      ) : (
        <button onClick={handleApproveCalc} className="btn btn-custom3">
          Approver le contrat pour acheter des crédits
        </button>
      )}

      <div className="mb-3">
        <p className="fs-5">Votre nombre de crédits {creditBalance}</p>
        <button onClick={handleUpdateCredits} className="btn btn-custom1">
          Rafraîchir
        </button>
      </div>
      <div className="mb-3">
        {displayOp.map((elem) => {
          return (
            <button
              onClick={(event) =>
                calcDispatch({
                  type: "SET_OPERATOR",
                  payload: event.target.value,
                })
              }
              className="btn btn-custom1 me-3"
              value={elem}
            >
              {elem}
            </button>
          )
        })}
      </div>
      <div className="d-flex mb-3">
        <div className="">
          <label htmlFor="number-1" className="form-label">
            Nombre 1
          </label>
          <input
            onChange={(event) =>
              calcDispatch({
                type: "CHANGE_NUMBER1",
                payload: event.target.value,
              })
            }
            id="number-1"
            type="number"
            className="form-control w-50"
          />
        </div>
        <div className="">
          <label htmlFor="number-2" className="form-label">
            Nombre 2
          </label>
          <input
            onChange={(event) =>
              calcDispatch({
                type: "CHANGE_NUMBER2",
                payload: event.target.value,
              })
            }
            id="number-2"
            type="number"
            className="form-control w-50"
          />
        </div>
      </div>
      <div className="d-flex">
        <span className="fs-2 me-2">{number1}</span>
        <span className="fs-2 me-2">{operator}</span>
        <span className="fs-2 me-2">{number2}</span>
        <button className="btn btn-custom2 ms-3">Result</button>
      </div>
    </div>
  )
}

export default Calculette
