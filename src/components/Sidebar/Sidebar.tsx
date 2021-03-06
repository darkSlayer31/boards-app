import axios from 'axios';

import {useAppSelector, useAppDispatch} from '../../hooks';
import {activeBoardChanged, boardDeleted} from 'src/store/reducers/boardsSlice/boardsSlice';
import BoardAddForm from '../BoardAddForm';

import './sidebar.scss';
import {errorNotify} from '../Toaster';

const Sidebar = () => {
  const {boards, boardsLoadingStatus} = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const onDelete = (id: string) => {
    axios
      .delete(`http://localhost:3001/boards/${id}`)
      .then(() => dispatch(activeBoardChanged('')))
      .then(() => dispatch(boardDeleted(id)))
      .catch(() => errorNotify());
  };

  return boardsLoadingStatus === 'error' ? (
    <h5>Ошибка загрузки</h5>
  ) : (
    <aside className="sidebar">
      <div className="boards">
        <h3 className="boards__header">Ваши доски</h3>

        {boards.length === 0 ? (
          <p>Досок пока нет</p>
        ) : (
          <ul className="boards__list">
            {boards.map((board) => {
              return (
                <li className="boards__list-item" key={board.id}>
                  <div className="boards__link" onClick={() => dispatch(activeBoardChanged(board.id))}>
                    <div className="boards__title">{board.name}</div>
                  </div>
                  <button type="button" className="btn" onClick={() => onDelete(board.id)}>
                    Удалить
                  </button>
                </li>
              );
            })}
          </ul>
        )}
        <BoardAddForm />
      </div>
    </aside>
  );
};

export default Sidebar;
