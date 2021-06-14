import { useState } from "react"

const Calculator = () => {
  const [operator, setOperator] = useState("+")
  const [number1, setNumber1] = useState(0)
  const [number2, setNumber2] = useState(0)

  const calculette = "+-x/%".split("")

  return (
    <div className="">
      <div className="mb-3">
        {calculette.map((elem) => {
          return (
            <button
              onClick={(event) => setOperator(event.target.value)}
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
            onChange={(event) => setNumber1(event.target.value)}
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
            onChange={(event) => setNumber2(event.target.value)}
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

export default Calculator
