import { useSelector } from 'react-redux';

import './appHeader.scss';

const AppHeader = () => {
    const {activeUser} = useSelector(state => state)

    return (
        <header className="header">
            <div className="container">
                <h2 className="header__title">Пространство пользователя {activeUser.username}</h2>
            </div>
        </header>
    )
}

export default AppHeader;