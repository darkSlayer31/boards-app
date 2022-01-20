import { useSelector} from 'react-redux';

import ColumnAddForm from '../columnAddForm/ColumnAddForm';
import ColumnsList from '../columnsList/ColumnsList';
import BoardRenameForm from '../boardRenameForm/BoardRenameForm';


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