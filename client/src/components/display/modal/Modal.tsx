import Loading from '../loading/Loading'
import './modal.css'

const Modal = ({status, setStatus}: any) => {

    return <div className="modal">
        <Loading text={status} setStatus={setStatus} />
    </div>
}

export default Modal