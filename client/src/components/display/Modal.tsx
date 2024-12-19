import Loading from './Loading'

import './modal.css'

const Modal = ({status, setStatus}: any) => {

    return <div className="modal">
        <p>{status}</p>
        <button onClick={() => setStatus(null)}>X</button>
        {status === 'loading' && <Loading />}
    </div>
}

export default Modal