import { useAppSelector, useAppDispatch, useHttp } from '../../hooks';
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';

import AppHeader from "../AppHeader";
import Sidebar from "../Sidebar";
import Board from "../Board";
import Modal from "../Modal";
import TaskModal from "../TaskModal";
import Authorization from "../Authorization";
import Loader from '../Loader';
import {
    boardsFetched, boardsFetching, boardsFetchingError, tasksFetched,
    tasksFetchingError, columnsFetched, columnsFetchingError, commentsFetched, commentsFetchingError, usersFetched, activeUserChanged
} from '../../actions';

import "./app.scss"
import { User } from 'src/types/types';


const App = () => {

    const { activeTask, activeUser, boardsLoadingStatus } = useAppSelector(state => state)
    const dispatch = useAppDispatch();
    const { request } = useHttp();


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
            .then(data => {
                dispatch(usersFetched(data));
                const usersData = [...data as User[]];
                const localUser = usersData.find((item) => item.username === localStorage.getItem('user'));

                if (localUser) {
                    dispatch(activeUserChanged(localUser));
                }
            })
            .catch((err) => console.log(err))
        // eslint-disable-next-line
    }, [])

    return (
        <>
            {boardsLoadingStatus === 'loading' && <Loader />}

            <ToastContainer hideProgressBar={true} position="top-center" theme="dark" />

            {activeUser ?
                <>
                    <AppHeader />
                    <div className="app">
                        <div className="app__wrapper">
                            <Sidebar />
                            <div className="workspace">
                                <Board />
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
                <Authorization />}
        </>

    );
}

export default App;