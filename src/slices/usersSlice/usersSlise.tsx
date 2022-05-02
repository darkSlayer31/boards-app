import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from 'src/types/types';

export interface State {
  users: User[];
  activeUser: User | null;
}

const initialState: State = {
  users: [],
  activeUser: null,
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
