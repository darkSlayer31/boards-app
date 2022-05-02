import {FC} from 'react';
import {batch} from 'react-redux';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {setModalActive, activeTaskChanged} from '../../slices/boardsSlice/boardsSlice';
import './modal.scss';

import modalCloseIcon from '../../assets/images/icons/modal-close.svg';

const Modal: FC = ({children}) => {
  const {modalActive} = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const onCloseHandler = () => {
    batch(() => {
      dispatch(setModalActive(false));
      dispatch(activeTaskChanged(null));
    });
  };

  return (
    <div className={modalActive ? 'modal show' : 'modal'} onClick={onCloseHandler}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <button className="modal__close" type="button" onClick={onCloseHandler}>
          <img src={modalCloseIcon} alt="Закрыть" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
