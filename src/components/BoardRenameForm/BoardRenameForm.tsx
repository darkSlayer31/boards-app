import React, {ChangeEvent, useEffect, useState} from 'react';
import axios from 'axios';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {boardUpdated} from '../../slices/boardsSlice/boardsSlice';
import {successNotify, errorNotify} from '../Toaster';
import {Board} from '../../types/types';

const BoardRenameForm = () => {
  const {activeBoardId, boards} = useAppSelector((state) => state.boards);

  const activeBoard = boards.find((item) => item.id === activeBoardId);

  const [activeBoardName, setActiveBoardName] = useState(activeBoard?.name);
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
      };

      axios
        .put(`http://localhost:3001/boards/${activeBoard.id}`, newBoard)
        .then(() => dispatch(boardUpdated(newBoard)))
        .then(() => successNotify('Доска изменена'))
        .catch(() => errorNotify());
    }
  };

  return (
    <form className="active-board__rename" onSubmit={onSubmitHandler}>
      <input
        type="text"
        className="active-board__title"
        value={activeBoardName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setActiveBoardName(e.target.value)}
      />
      <button className="btn" type="submit">
        Переименовать
      </button>
    </form>
  );
};

export default BoardRenameForm;
