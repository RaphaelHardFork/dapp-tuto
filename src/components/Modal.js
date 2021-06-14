const Modal = ({ modal, setModal }) => {
  function quitModal() {
    setModal(false)
  }
  return (
    <>
      <div
        onClick={quitModal}
        className={`modele ${
          modal ? "open" : ""
        } d-flex justify-content-center`}
      >
        <div className="m-auto">
          <label
            htmlFor="send-ether"
            className="form-label display-3 text-white"
          >
            Montant
          </label>
          <input type="number" className="form-control mb-4" />
          <button className="btn btn-custom1 ">Donate</button>
        </div>
      </div>
    </>
  )
}

export default Modal
