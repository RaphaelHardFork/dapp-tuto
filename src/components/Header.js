import { useContext } from "react"
import { Web3Context } from "web3-hooks"

const Header = () => {
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
      <div className="border-bottom border-dark">
        <h1 className="display-1 text-center ">Hello Hard Fork Dapp</h1>
      </div>
      {web3State.isLogged ? (
        <div className="border-bottom border-dark">
          <div className="container my-3">
            <div className="row">
              <div className="col-lg-6  text-center text-lg-start">
                <p className=" fs-4 p-0 my-auto">
                  Network : {web3State.networkName} (chainID:{" "}
                  {web3State.chainId})
                </p>
              </div>
              <div className="col-lg-6 d-flex justify-content-center justify-content-lg-end">
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
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={login}
          className="btn btn-custom3 position-absolute top-0 end-0 mt-5 me-3"
        >
          Login
        </button>
      )}
    </>
  )
}

export default Header
