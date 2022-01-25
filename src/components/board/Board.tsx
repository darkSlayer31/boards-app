import { useAppSelector } from '../../hooks';

import ColumnAddForm from '../ColumnAddForm';
import ColumnsList from '../ColumnsList';
import BoardRenameForm from '../BoardRenameForm';


import './board.scss'

const Board = () => {
    const { activeBoardId } = useAppSelector(state => state);

    if (activeBoardId === '') {
        return <h5 className="active-board__title">Выберите доску</h5>;
    }

    return (
        <>
            <BoardRenameForm />
            <div className="columns">
                <ColumnsList boardId={activeBoardId} />
                <ColumnAddForm />
            </div>
        </>
    )
}

export default Board;