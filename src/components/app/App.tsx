import {useEffect} from 'react';
import {ToastContainer} from 'react-toastify';

import {useAppSelector, useAppDispatch} from '../../hooks';
import AppHeader from '../AppHeader';
import Sidebar from '../Sidebar';
import Board from '../Board';
import Modal from '../Modal';
import TaskModal from '../TaskModal';
import Authorization from '../Authorization';
import Loader from '../Loader';
import {fetchData, fetchUsers, fetchBoards} from 'src/store/reducers/action-creators';

import './app.scss';

const App = () => {
  const {activeTask, boardsLoadingStatus} = useAppSelector((state) => state.boards);
  const {activeUser} = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchData());
    dispatch(fetchUsers());
    dispatch(fetchBoards());
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
