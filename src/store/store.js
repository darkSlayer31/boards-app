import { configureStore } from '@reduxjs/toolkit';
import reducer from '../reducers';

export const store = configureStore({
    reducer: reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production',
});
