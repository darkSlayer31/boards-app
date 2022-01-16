import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {useHttp} from '../../hooks/http.hook';
import { boardsFetched, boardsFetching, boardsFetchingError, boardDeleted, activeBoardChanged, tasksFetched,
tasksFetchingError, columnsFetched, columnsFetchingError, commentsFetched, commentsFetchingError } from '../../actions';
import BoardAddForm from '../boardAddForm/BoardAddForm';
import Spinner from '../spinner/Spinner';


import './sidebar.scss';

const Sidebar = () => {

    const {boards, boardsLoadingStatus} = useSelector(state => state);

    const {request} = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(boardsFetching());
        request("http://localhost:3001/boards")
            .then(data => dispatch(boardsFetched(data)))
            .catch((err) => dispatch(boardsFetchingError()))
        request("http://localhost:3001/columns")
            .then(data => dispatch(columnsFetched(data)))
            .catch((err) => dispatch(columnsFetchingError()))
        request("http://localhost:3001/tasks")
            .then(data => dispatch(tasksFetched(data)))
            .catch((err) => dispatch(tasksFetchingError()))
        request("http://localhost:3001/comments")
            .then(data => dispatch(commentsFetched(data)))
            .catch((err) => dispatch(commentsFetchingError()))
            // eslint-disable-next-line
    }, [])

    const onDelete = (id) => {
        request(`http://localhost:3001/boards/${id}`, 'DELETE')
            .then(data => console.log(data, "Deleted"))
            .then(dispatch(boardDeleted(id)))
            .catch(err => console.log(err))
    }

    if (boardsLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (boardsLoadingStatus === "error") {
        return <h5>Ошибка загрузки</h5>
    }

    const renderBoardsList = (arr) => {
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
                <BoardAddForm/>
            </div>
        </aside>
    )
}

export default Sidebar;