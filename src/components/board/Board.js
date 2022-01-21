import { useSelector} from 'react-redux';

import ColumnAddForm from '../ColumnAddForm';
import ColumnsList from '../ColumnsList';
import BoardRenameForm from '../BoardRenameForm';


import './board.scss'

const Board = () => {
    const {activeBoardId} = useSelector(state => state);

    if (activeBoardId === null) {
        return <h5 className="active-board__title">Выберите доску</h5>;
    }

    return (
        <>
            <BoardRenameForm/>
            <div className="columns">
                <ColumnsList boardId= {activeBoardId}/>
                <ColumnAddForm/>
            </div>
        </>
    )
}

export default Board;