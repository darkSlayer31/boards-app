import React, { ChangeEvent, useEffect, useState } from 'react';

import { useAppSelector, useAppDispatch, useHttp } from '../../hooks';
import { boardUpdated } from '../../actions';
import { successNotify, errorNotify } from '../Toaster';
import { Board } from '../../types/types';

const BoardRenameForm = () => {

    const { activeBoardId, boards } = useAppSelector(state => state);

    const activeBoard = boards.find(item => item.id === activeBoardId);

    const [activeBoardName, setActiveBoardName] = useState(activeBoard?.name);
    const { request } = useHttp();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (activeBoard) {
            setActiveBoardName(activeBoard.name);
        }
    }, [activeBoard]);

    const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (activeBoard && activeBoardName) {
            const newBoard: Board = {
                id: activeBoard.id,
                name: activeBoardName,
            }

            request(`http://localhost:3001/boards/${activeBoard.id}`, "PUT", JSON.stringify(newBoard))
                .then(() => dispatch(boardUpdated(activeBoard.id, newBoard)))
                .then(() => successNotify('Доска изменена'))
                .catch(() => errorNotify());
        }
    }

    return (
        <form className='active-board__rename' onSubmit={onSubmitHandler}>
            <input type="text" className="active-board__title"
                value={activeBoardName}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setActiveBoardName(e.target.value)}
            />
            <button className="btn" type="submit">Переименовать</button>
        </form>
    )
}

export default BoardRenameForm;