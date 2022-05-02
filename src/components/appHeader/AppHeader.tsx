import {activeUserChanged} from '../../slices/usersSlice/usersSlise';
import {useAppSelector, useAppDispatch} from '../../hooks';

import './appHeader.scss';

const AppHeader = () => {
  const {activeUser} = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const onExitHandler = () => {
    dispatch(activeUserChanged(null));
    localStorage.setItem('user', '');
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <h2 className="header__title">Пространство пользователя {activeUser?.username}</h2>
          <button type="button" className="btn" onClick={() => onExitHandler()}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
