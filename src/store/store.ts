import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import booksReducer from '../features/booksSlice';
import bookDetailsReducer from '../features/bookDetailsSlice';
import authReducer from '../features/authSlice';
import bookmarksReducer from '../features/bookmarksSlice';
import chapterDetailsReducer from '../features/chapterDetailsSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      books: booksReducer,
      bookDetails: bookDetailsReducer,
      auth: authReducer,
      bookmarks: bookmarksReducer,
      chapterDetails: chapterDetailsReducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>

export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
