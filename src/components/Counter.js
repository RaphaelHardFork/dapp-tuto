import { useState } from "react"
import { useCounter } from "../contexts/CounterContext"

const Counter = () => {
  const [counter, counterState, counterDispatch] = useCounter()

  const [count, setCount] = useState(0)
  const [counterStatus, setCounterStatus] = useState()

  const handleGetCount = async () => {
    try {
      const count = await counter.counter()
      setCount(count.toString())
      setCounterStatus("")
    } catch (e) {
      console.log(e)
    }
  }

  const handleIncrementCount = async () => {
    setCounterStatus("waiting for confirmation")
    try {
      let tx = await counter.increment()
      setCounterStatus("Pending")
      await tx.wait()
      setCount((await counter.counter()).toString())
      setCounterStatus("Success")
    } catch (e) {
      console.log(e)
      if (e.code === 4001) {
        setCounterStatus("Transaction rejected")
      } else if (e.code === "INSUFFICIENT_FUNDS") {
        setCounterStatus("Insufficient Funds")
      } else {
        setCounterStatus("Failed")
        console.log(e)
      }
    }
  }

  const handleDecrementCount = async () => {
    setCounterStatus("Waiting for confirmation")
    try {
      let tx = await counter.decrement()
      setCounterStatus("Pending")
      await tx.wait()
      setCount((await counter.counter()).toString())
      setCounterStatus("Success")
    } catch (e) {
      console.log(e)
      if (e.code === 4001) {
        setCounterStatus("Transaction rejected")
      } else if (e.code === "INSUFFICIENT_FUNDS") {
        setCounterStatus("Insufficient Funds")
      } else {
        setCounterStatus("Failed")
        console.log(e)
      }
    }
  }

  const counterStatusStyle = (CountStat) => {
    switch (CountStat) {
      case "":
        return ""
      case "Waiting for confirmation":
        return "alert alert-warning"
      case "Pending":
        return "alert alert-warning"
      case "Success":
        return "alert alert-success"
      case "Failed":
        return "alert alert-danger"
      case "Transaction rejected":
        return "alert alert-danger"
      case "Insufficient Funds":
        return "alert alert-danger"
      default:
        return "alert alert-dark"
    }
  }

  return (
    <>
      <div className="d-flex mb-3">
        <p className="text-muted my-auto me-3">Count: {count} </p>
        {counterStatus && (
          <div className={`my-auto ${counterStatusStyle(counterStatus)}`}>
            {counterStatus}
          </div>
        )}
      </div>
      <button onClick={handleGetCount} className="btn btn-custom1 me-3">
        Avoir le <i>count</i>
      </button>
      <button onClick={handleIncrementCount} className="btn btn-custom1 me-3">
        <b>+</b>
      </button>
      <button onClick={handleDecrementCount} className="btn btn-custom1 me-3">
        <b>-</b>
      </button>
    </>
  )
}

export default Counter
