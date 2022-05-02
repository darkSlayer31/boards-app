import {useAppSelector} from '../../hooks';

import ColumnAddForm from '../ColumnAddForm';
import ColumnsList from '../ColumnsList';
import BoardRenameForm from '../BoardRenameForm';

import './board.scss';

const Board = () => {
  const {activeBoardId} = useAppSelector((state) => state.boards);

  return activeBoardId === '' ? (
    <h2 className="active-board__title">Выберите доску</h2>
  ) : (
    <>
      <BoardRenameForm />
      <div className="columns">
        <ColumnsList boardId={activeBoardId} />
        <ColumnAddForm />
      </div>
    </>
  );
};

export default Board;
