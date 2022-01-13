import { useSelector, useDispatch } from 'react-redux';
import { setModalActive } from '../../actions';

import modalCloseIcon from './modal-close.svg';
import './modal.scss';

const Modal = ({children}) => {
    const {modalActive} = useSelector(state => state)
    const dispatch = useDispatch();

    return (
        <div className={modalActive ? 'modal show' : 'modal'} onClick={() => dispatch(setModalActive(false))}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <button className="modal__close" type="button" onClick={() => dispatch(setModalActive(false))}>
                    <img src={modalCloseIcon} alt="Закрыть"></img>
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal;