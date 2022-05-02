import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Board, Column, Task, Comment} from '../../types/types';

type boardsState = {
  boards: Board[];
  columns: Column[];
  tasks: Task[];
  comments: Comment[];
  boardsLoadingStatus: string;
  activeBoardId: string;
  activeTask: Task | null;
  modalActive: boolean;
};

const initialState: boardsState = {
  boards: [],
  columns: [],
  tasks: [],
  comments: [],
  activeBoardId: '',
  boardsLoadingStatus: 'idle',
  activeTask: null,
  modalActive: false,
};

const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    boardsFetching(state) {
      state.boardsLoadingStatus = 'loading';
    },
    boardsFetched(state, action: PayloadAction<Board[]>) {
      state.boards = action.payload;
      state.boardsLoadingStatus = 'idle';
    },
    boardsFetchingError(state) {
      state.boardsLoadingStatus = 'error';
    },
    boardCreated(state, action: PayloadAction<Board>) {
      state.boards.push(action.payload);
    },
    boardDeleted(state, action: PayloadAction<string>) {
      state.boards = state.boards.filter((item) => item.id !== action.payload);
      state.columns = state.columns.filter((item) => item.parent !== action.payload);
      state.tasks = state.tasks.filter((item) => item.boardParent !== action.payload);
      state.comments = state.comments.filter((item) => item.boardParent !== action.payload);
    },
    boardUpdated(state, action: PayloadAction<Board>) {
      const index = state.boards.findIndex((item) => item.id === action.payload.id);
      state.boards[index] = action.payload;
    },
    activeBoardChanged(state, action: PayloadAction<string>) {
      state.activeBoardId = action.payload;
    },
    columnsFetching(state) {
      state.boardsLoadingStatus = 'loading';
    },
    columnsFetched(state, action: PayloadAction<Column[]>) {
      state.columns = action.payload;
    },
    columnsFetchingError(state) {
      state.boardsLoadingStatus = 'error';
    },
    columnCreated(state, action: PayloadAction<Column>) {
      state.columns.push(action.payload);
    },
    columnDeleted(state, action: PayloadAction<string>) {
      state.columns = state.columns.filter((item) => item.id !== action.payload);
      state.tasks = state.tasks.filter((item) => item.parent !== action.payload);
      state.comments = state.comments.filter((item) => item.columnParent !== action.payload);
    },
    tasksFetching(state) {
      state.boardsLoadingStatus = 'loading';
    },
    tasksFetched(state, action: PayloadAction<Task[]>) {
      state.tasks = action.payload;
    },
    tasksFetchingError(state) {
      state.boardsLoadingStatus = 'error';
    },
    taskCreated(state, action: PayloadAction<Task>) {
      state.tasks.push(action.payload);
    },
    taskDeleted(state, action: PayloadAction<string>) {
      state.tasks = state.tasks.filter((item) => item.id !== action.payload);
      state.comments = state.comments.filter((item) => item.parent !== action.payload);
    },
    taskUpdated(state, action: PayloadAction<Task>) {
      const index = state.tasks.findIndex((item) => item.id === action.payload.id);
      state.tasks[index] = action.payload;
    },
    activeTaskChanged(state, action: PayloadAction<Task | null>) {
      state.activeTask = action.payload;
    },
    commentsFetching(state) {
      state.boardsLoadingStatus = 'loading';
    },
    commentsFetched(state, action: PayloadAction<Comment[]>) {
      state.comments = action.payload;
    },
    commentsFetchingError(state) {
      state.boardsLoadingStatus = 'error';
    },
    commentCreated(state, action: PayloadAction<Comment>) {
      state.comments.push(action.payload);
    },
    commentDeleted(state, action: PayloadAction<string>) {
      state.comments = state.comments.filter((item) => item.id !== action.payload);
    },
    commentUpdated(state, action: PayloadAction<Comment>) {
      const index = state.comments.findIndex((item) => item.id === action.payload.id);
      state.comments[index] = action.payload;
    },
    setModalActive(state, action: PayloadAction<boolean>) {
      state.modalActive = action.payload;
    },
  },
});

const {actions, reducer} = boardsSlice;

export default reducer;
export const {
  boardsFetching,
  boardsFetched,
  boardsFetchingError,
  boardCreated,
  boardDeleted,
  boardUpdated,
  commentsFetching,
  commentsFetched,
  commentsFetchingError,
  commentCreated,
  commentDeleted,
  commentUpdated,
  tasksFetching,
  tasksFetched,
  tasksFetchingError,
  taskCreated,
  taskDeleted,
  taskUpdated,
  columnsFetching,
  columnsFetched,
  columnsFetchingError,
  columnCreated,
  columnDeleted,
  activeBoardChanged,
  setModalActive,
  activeTaskChanged,
} = actions;
