import {FC} from 'react';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setModalActive} from '../../actions';
import './modal.scss';

import modalCloseIcon from '../../assets/images/icons/modal-close.svg';

const Modal: FC = ({children}) => {
  const {modalActive} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  return (
    <div className={modalActive ? 'modal show' : 'modal'} onClick={() => dispatch(setModalActive(false, null))}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" onClick={() => dispatch(setModalActive(false, null))}>
          <img src={modalCloseIcon} alt="Закрыть"></img>
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
