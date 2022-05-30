import {AppDispatch} from '..';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {batch} from 'react-redux';
import {
  dataFetching,
  //boardsFetched,
  dataFetchingError,
  tasksFetched,
  columnsFetched,
  commentsFetched,
} from './boardsSlice/boardsSlice';
import {usersFetched, activeUserChanged} from './usersSlice/usersSlise';
import {errorNotify} from 'src/components/Toaster';

import {Board, Task, Column, Comment, User} from 'src/types/types';

export const fetchData = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(dataFetching());
    const boards = await axios.get<Board[]>('http://localhost:3001/boards');
    const columns = await axios.get<Column[]>('http://localhost:3001/columns');
    const tasks = await axios.get<Task[]>('http://localhost:3001/tasks');
    const comments = await axios.get<Comment[]>('http://localhost:3001/comments');

    batch(() => {
      //dispatch(boardsFetched(boards.data));
      dispatch(columnsFetched(columns.data));
      dispatch(tasksFetched(tasks.data));
      dispatch(commentsFetched(comments.data));
    });
  } catch {
    dispatch(dataFetchingError());
  }
};

export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    const res = await axios.get<User[]>('http://localhost:3001/users');
    dispatch(usersFetched(res.data));
    const usersData = [...res.data];
    const localUser = usersData.find((item) => item.username === localStorage.getItem('user'));
    localUser && dispatch(activeUserChanged(localUser));
  } catch {
    errorNotify();
  }
};

export const fetchBoards = createAsyncThunk('boards/fetchAll', async (_, thunkAPI) => {
  try {
    const res = await axios.get<Board[]>('http://localhost:3001/boards');
    return res.data;
  } catch (e) {
    return thunkAPI.rejectWithValue('Не удалось загрузить доски');
  }
});

// export const fetchUsers = createAsyncThunk('users/fetchAll', async (_, thunkAPI) => {
//   try {
//     const res = await axios.get<User[]>('http://localhost:3001/users');
//     return res.data;
//   } catch (e) {
//     return thunkAPI.rejectWithValue('Не удалось загрузить пользователей');
//   }
// });
