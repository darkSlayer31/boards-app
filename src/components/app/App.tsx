import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';
import axios from 'axios';
import {batch} from 'react-redux';

import {User} from 'src/types/types';

import {useAppSelector, useAppDispatch} from '../../hooks';
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
  columnsFetched,
  commentsFetched,
} from '../../slices/boardsSlice/boardsSlice';
import {usersFetched, activeUserChanged} from 'src/slices/usersSlice/usersSlise';
import {Board as BoardType, Task, Column, Comment} from 'src/types/types';

import './app.scss';

const App = () => {
  const {activeTask, boardsLoadingStatus} = useAppSelector((state) => state.boards);
  const {activeUser} = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    try {
      dispatch(boardsFetching());
      const boards = (await axios.get<BoardType[]>('http://localhost:3001/boards')).data;
      const columns = (await axios.get<Column[]>('http://localhost:3001/columns')).data;
      const tasks = (await axios.get<Task[]>('http://localhost:3001/tasks')).data;
      const comments = (await axios.get<Comment[]>('http://localhost:3001/comments')).data;

      batch(() => {
        dispatch(boardsFetched(boards));
        dispatch(columnsFetched(columns));
        dispatch(tasksFetched(tasks));
        dispatch(commentsFetched(comments));
      });
    } catch {
      dispatch(boardsFetchingError());
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/users');
      dispatch(usersFetched(res.data));
      const usersData = [...(res.data as User[])];
      const localUser = usersData.find((item) => item.username === localStorage.getItem('user'));
      localUser && dispatch(activeUserChanged(localUser));
    } catch {
      errorNotify();
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {boardsLoadingStatus === 'loading' && <Loader />}

      <ToastContainer hideProgressBar position="top-center" theme="dark" />

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
