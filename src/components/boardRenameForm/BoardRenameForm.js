import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { boardUpdated } from '../../actions';
import { successNotify, errorNotify } from '../Toaster';

const BoardRenameForm = () => {

    const {activeBoardId, boards} = useSelector(state => state);
    const activeBoard = boards.find(item => item.id === activeBoardId);

    const [activeBoardName, setActiveBoardName] = useState(activeBoard.name);
    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        setActiveBoardName(activeBoard.name);
    }, [activeBoard]);

    const onSubmitHandler = (e) => {
        e.preventDefault();
        const newBoard = {
            id: activeBoard.id,
            name: activeBoardName,
            columns: activeBoard.columns
        }

        request(`http://localhost:3001/boards/${activeBoard.id}`, "PUT", JSON.stringify(newBoard))
            .then(() => dispatch(boardUpdated(activeBoard.id, newBoard)))
            .then(() => successNotify('Доска изменена'))
            .catch(() => errorNotify());
    }

    return (
        <form className='active-board__rename' onSubmit={onSubmitHandler}>
            <input type="text" className="active-board__title"
                value={activeBoardName}
                onChange={(e) => setActiveBoardName(e.target.value)}
                />
            <button className="btn" type="submit">Переименовать</button>
        </form>
    )
}

export default BoardRenameForm;