import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'src/types/types';

type usersState = {
  users: User[];
  activeUser: User | null;
  usersLoadingStatus: string;
};

const initialState: usersState = {
  users: [],
  activeUser: null,
  usersLoadingStatus: 'idle',
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    userAdded(state, action: PayloadAction<User>) {
      state.users.push(action.payload);
    },
    usersFetched(state, action: PayloadAction<User[]>) {
      state.users = action.payload;
    },
    activeUserChanged(state, action: PayloadAction<User | null>) {
      state.activeUser = action.payload;
    },
  },
});

const {actions, reducer} = usersSlice;

export default reducer;
export const {userAdded, usersFetched, activeUserChanged} = actions;
