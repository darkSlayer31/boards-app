import { activeUserChanged } from 'src/actions';
import { useAppSelector, useAppDispatch } from '../../hooks';

import './appHeader.scss';

const AppHeader = () => {
    const { activeUser } = useAppSelector(state => state)
    const dispatch = useAppDispatch()

    const onExitHandler = () => {
        dispatch(activeUserChanged(null))
        localStorage.setItem('user', '')
    }

    return (
        <header className="header">
            <div className="container">
                <div className="header__inner">
                    <h2 className="header__title">Пространство пользователя {activeUser?.username}</h2>
                    <button className='btn' onClick={() => onExitHandler()}>Выйти</button>
                </div>
            </div>
        </header>
    )
}

export default AppHeader;