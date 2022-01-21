import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useHttp } from "../../hooks/http.hook";

import AppHeader from "../AppHeader";
import Sidebar from "../Sidebar";
import Board from "../Board";
import Modal from "../Modal";
import TaskModal from "../TaskModal";
import Authorization from "../Authorization";
import {boardsFetched, boardsFetching, boardsFetchingError, tasksFetched,
    tasksFetchingError, columnsFetched, columnsFetchingError, commentsFetched, commentsFetchingError, usersFetched } from '../../actions';

import "./app.scss"

const App = () => {

    const {activeTask, activeUser} = useSelector(state => state)
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(boardsFetching());
        request("http://localhost:3001/boards")
            .then(data => dispatch(boardsFetched(data)))
            .catch(() => dispatch(boardsFetchingError()))
        request("http://localhost:3001/columns")
            .then(data => dispatch(columnsFetched(data)))
            .catch(() => dispatch(columnsFetchingError()))
        request("http://localhost:3001/tasks")
            .then(data => dispatch(tasksFetched(data)))
            .catch(() => dispatch(tasksFetchingError()))
        request("http://localhost:3001/comments")
            .then(data => dispatch(commentsFetched(data)))
            .catch(() => dispatch(commentsFetchingError()))
        request("http://localhost:3001/users")
            .then(data => dispatch(usersFetched(data)))
            .catch(() => dispatch(boardsFetchingError()))
            // eslint-disable-next-line
    }, [])

    return (
        <>
            {activeUser ?
            <>
                <AppHeader/>
                <div className="app">
                    <div className="app__wrapper">
                        <Sidebar/>
                        <div className="workspace">
                            <Board/>
                        </div>
                    </div>
                </div>
                {activeTask && (
                    <Modal>
                        <TaskModal />
                    </Modal>
                )}
            </>
            :
            <Authorization/>}
        </>

    );
}

export default App;