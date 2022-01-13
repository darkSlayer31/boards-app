import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import { boardUpdated } from '../../actions';

const BoardRenameForm = () => {

    const {activeBoard} = useSelector(state => state);

    const [activeBoardName, setActiveBoardName] = useState("");
    const {request} = useHttp();
    const dispatch = useDispatch();



    const onSubmitHandler = (e) => {
        e.preventDefault();
        // const newBoard = {
        //     id: activeBoard.id,
        //     name: activeBoardName,
        //     columns: activeBoard.columns
        // }

        dispatch(boardUpdated(activeBoard.id, activeBoardName))


        // request(`http://localhost:3001/boards/${activeBoard.id}`, "PUT", JSON.stringify(newBoard))
        //     .then(res => console.log(res, "Отправка успешна"))
        //     .then(dispatch(boardUpdated(activeBoard.id, activeBoardName)))
        //     .catch(err => console.log(err));
    }

    return (
        <form className='active-board__rename' onSubmit={onSubmitHandler}>
            <input type="text" className="active-board__title"
                //defaultValue={activeBoard.name}
                value={activeBoard.name}
                onChange={(e) => setActiveBoardName(e.target.value)}
                />
            <button className="btn" type="submit">Переименовать</button>
        </form>
    )
}

export default BoardRenameForm;