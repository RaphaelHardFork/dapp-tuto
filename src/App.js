import { useContext, useState } from "react"
import { Web3Context } from "web3-hooks"
import { ethers } from "ethers"
import "bootstrap/dist/css/bootstrap.css"
import "./App.css"

const App = () => {
  const [web3State, login] = useContext(Web3Context)

  const [ethBalance, setEthBalance] = useState(0)
  const [address, setAddress] = useState()
  const [eth2send, setEth2send] = useState(0)
  const [txStatus, setTxStatus] = useState("")

  const handleClickGetBalance = async () => {
    let balance
    try {
      balance = await web3State.provider.getBalance(address)
      setEthBalance(ethers.utils.formatEther(balance))
    } catch (e) {
      setEthBalance(`This address is not valid`)
    }
  }

  const handleClickSendEther = async () => {
    let etherSend = ethers.utils.parseEther(eth2send.toString())
    let tx
    setTxStatus("Waiting for confirmation")
    try {
      tx = await web3State.signer.sendTransaction({
        to: address,
        value: etherSend,
      })
      setTxStatus("Pending")
      await tx.wait()
      setTxStatus("Success")
    } catch (error) {
      console.log(error.code)
      if (error.code === 4001) {
        setTxStatus("Transaction rejected")
      } else if (error.code === "INSUFFICIENT_FUNDS") {
        setTxStatus("Insufficient Funds")
      } else {
        setTxStatus("Failed")
        console.log(error)
      }
    }
  }

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

  const txStyle = (txStat) => {
    switch (txStat) {
      case "":
        return ""
      case "Waiting for confirmation":
        return "alert alert-warning"
      case "Pending":
        return "alert alert-warning"
      case "Success":
        return "alertalert-success"
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
    <div className="App bg-custom min-vh-100">
      <h1 className="display-1 text-center border-bottom border-dark">
        Hello Hard Fork
      </h1>
      {web3State.isLogged ? (
        <div className="border-bottom border-dark">
          <div className="container mb-3">
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
        <div className="container">
          <button className="btn btn-custom position-absolute top-0 end-0 mt-3 me-3">
            Login
          </button>
        </div>
      )}
      <div className="container">
        {web3State.isMetaMask ? (
          ""
        ) : (
          <p className="fs-1 text-center">
            <b>/!\</b> Installer{" "}
            <a className="text-custom" href="https://metamask.io/">
              MetaMask
            </a>{" "}
            pour utiliser l'application.
          </p>
        )}
      </div>

      <div className="container">
        <h2 className="display-5 text-center text-lg-start">
          Utilisation de MetaMask
        </h2>
        <div className="mb-3">
          <label htmlFor="balance-of" className="form-label">
            Voir la balance de l'adresse :
          </label>
          <input
            id="balance-of"
            type="text"
            className="form-control w-50"
            placeholder="0x000...000"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          />
          <div className="form-text mb-3">{}</div>
          <div className="d-flex">
            <button
              onClick={handleClickGetBalance}
              className="btn btn-primary me-3"
            >
              Voir la balance
            </button>
            <button
              onClick={() => setEthBalance(web3State.balance)}
              className="btn btn-primary me-3"
            >
              Voir ma balance
            </button>
            <div className="fs-5 p-0 my-auto">Balance : {ethBalance} ETH</div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="send-ether" className="form-label">
            Adresse à envoyer de l'ether :
          </label>
          <input
            id="send-ether"
            type="text"
            className="form-control w-50 mb-3"
            placeholder="0x000...000"
            onChange={(event) => setAddress(event.target.value)}
            value={address}
          />
          <label htmlFor="amount" className="form-label">
            Montant :
          </label>
          <input
            id="amount"
            type="number"
            className="form-control w-50"
            onChange={(event) => setEth2send(event.target.value)}
            value={eth2send}
          />
        </div>
        <div className="d-flex">
          <button
            onClick={handleClickSendEther}
            className="btn btn-success me-3 align-self-center"
          >
            Envoyer
          </button>
          <div className={`fs-5 my-auto ${txStyle(txStatus)} `}>{txStatus}</div>
        </div>
      </div>

      {/* UTILISATION D'UN SMART CONTRACT */}
      <div className="border-top border-dark mt-3">
        <div className="container">
          <h2 className="display-5">Utilisation d'un Smart Contract</h2>
        </div>
      </div>

      {/* EXEMPLE DU COURS */}
    </div>
  )
}

export default App
