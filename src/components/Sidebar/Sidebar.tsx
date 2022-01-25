import { useAppSelector, useAppDispatch, useHttp } from "../../hooks";
import { boardDeleted, activeBoardChanged } from '../../actions';
import BoardAddForm from '../BoardAddForm';
import { Board } from '../../types/types';


import './sidebar.scss';
import { errorNotify } from '../Toaster';

const Sidebar = () => {

    const { boards, boardsLoadingStatus } = useAppSelector(state => state);
    const { request } = useHttp();
    const dispatch = useAppDispatch();

    const onDelete = (id: string) => {
        request(`http://localhost:3001/boards/${id}`, 'DELETE')
            .then(() => dispatch(activeBoardChanged(null)))
            .then(() => dispatch(boardDeleted(id)))
            .catch(() => errorNotify())
    }

    if (boardsLoadingStatus === "error") {
        return <h5>Ошибка загрузки</h5>
    }

    const renderBoardsList = (arr: Board[]) => {
        if (arr.length === 0) {
            return (
                <h5>Досок пока нет</h5>
            )
        }

        return arr.map(board => {
            return (
                <li className="boards__list-item" key={board.id}>
                    <div
                        className="boards__link"
                        onClick={() => dispatch(activeBoardChanged(board.id))} >
                        <div className="boards__title">{board.name}</div>
                    </div>
                    <button
                        className="btn"
                        onClick={() => onDelete(board.id)} >Удалить</button>
                </li>
            )
        })
    }

    const elements = renderBoardsList(boards);

    return (
        <aside className="sidebar">
            <div className="boards">
                <div className="boards__header">Ваши доски</div>
                <ul className="boards__list">
                    {elements}
                </ul>
                <BoardAddForm />
            </div>
        </aside>
    )
}

export default Sidebar;