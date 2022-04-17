import {useAppSelector, useAppDispatch} from '../../hooks';
import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import axios from 'axios';

import AppHeader from '../AppHeader';
import Sidebar from '../Sidebar';
import Board from '../Board';
import Modal from '../Modal';
import TaskModal from '../TaskModal';
import Authorization from '../Authorization';
import Loader from '../Loader';
import {errorNotify} from '../Toaster';
import {
  boardsFetched,
  boardsFetching,
  boardsFetchingError,
  tasksFetched,
  tasksFetchingError,
  columnsFetched,
  columnsFetchingError,
  commentsFetched,
  commentsFetchingError,
  usersFetched,
  activeUserChanged,
} from '../../actions';

import './app.scss';
import {User} from 'src/types/types';

//const axios = require('axios');

const App = () => {
  const {activeTask, activeUser, boardsLoadingStatus} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(boardsFetching());
    axios
      .get('http://localhost:3001/boards')
      .then((res) => dispatch(boardsFetched(res.data)))
      .catch(() => dispatch(boardsFetchingError()));
    axios
      .get('http://localhost:3001/columns')
      .then((res) => dispatch(columnsFetched(res.data)))
      .catch(() => dispatch(columnsFetchingError()));
    axios
      .get('http://localhost:3001/tasks')
      .then((res) => dispatch(tasksFetched(res.data)))
      .catch(() => dispatch(tasksFetchingError()));
    axios
      .get('http://localhost:3001/comments')
      .then((res) => dispatch(commentsFetched(res.data)))
      .catch(() => dispatch(commentsFetchingError()));
    axios
      .get('http://localhost:3001/users')
      .then((res) => {
        dispatch(usersFetched(res.data));
        const usersData = [...(res.data as User[])];
        const localUser = usersData.find((item) => item.username === localStorage.getItem('user'));

        if (localUser) {
          dispatch(activeUserChanged(localUser));
        }
      })
      .catch((err) => errorNotify(err));
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {boardsLoadingStatus === 'loading' && <Loader />}

      <ToastContainer hideProgressBar={true} position="top-center" theme="dark" />

      {activeUser ? (
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
      ) : (
        <Authorization />
      )}
    </>
  );
};

export default App;
