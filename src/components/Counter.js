import { useState } from "react"
import { useSeveralContracts } from "../hooks/useSeveralContracts"

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
      counterDispatch({ type: "COUNT_PENDING" })
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
      counterDispatch({ type: "COUNT_PENDING" })
      let tx = await counter.setStep(number)
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
      <div className="d-flex mb-3">
        <p className="text-muted my-auto me-3">
          Count: {count} Step: {step}{" "}
        </p>

        {counterStatus && (
          <div className={`my-auto ${counterStatusStyle}`}>{counterStatus}</div>
        )}
      </div>
      <div className="d-flex mb-3">
        <button onClick={handleUpdateCount} className="btn btn-custom1 me-3">
          Rafraîchir
        </button>
        <button
          onClick={() => handleChangeCount(1)}
          className="btn btn-custom1 me-3"
        >
          <b>+</b>
        </button>
        <button
          onClick={() => handleChangeCount(3)}
          className="btn btn-custom2 me-3"
        >
          <b>Reset</b>
        </button>
        <button
          onClick={() => handleChangeCount(2)}
          className="btn btn-custom1 me-3"
        >
          <b>-</b>
        </button>
        <div className="input-group w-25">
          <button
            onClick={handleChangeStep}
            id="step"
            className="btn btn-custom2"
          >
            Changez le step
          </button>
          <input
            value={number}
            aria-describedby="step"
            aria-label="Change the step"
            type="number"
            className="form-control "
            onChange={(event) => setNumber(event.target.value)}
          />
        </div>
      </div>
      <div className="">
        <label htmlFor="is-owner" className="form-label">
          Tapez votre adresse pour voir si vous êtes sur la liste :
        </label>
        <div className="d-flex">
          <input
            placeholder="0x0000...000"
            id="is-owner"
            type="text"
            className="form-control w-50 me-3"
            onChange={(event) =>
              counterDispatch({
                type: "CHANGE_ADDRESS",
                payload: event.target.value,
              })
            }
          />
          <button onClick={handleCheckAddress} className="btn btn-custom3">
            Check
          </button>
        </div>
        {isOwner ? (
          <p>Vous êtes sur la liste, vous pouvez utiliser "Reset"</p>
        ) : (
          <p>
            Vous n'êtes pas sur la liste (il vous reste {10 - nbOperation}{" "}
            opération pour y être).
          </p>
        )}
      </div>
    </>
  )
}

export default Counter
