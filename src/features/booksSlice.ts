/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BookCard } from '../types/Book';
import { getBooks } from '@/api/books';

export interface BookState {
  books: BookCard[];
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  books: [],
  loading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async () => {
    const booksFromServer = await getBooks();

    return booksFromServer;
  },
);

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.error = action.error.message || 'Error in fetching data';
        state.loading = false;
      });
  },
});

export default booksSlice.reducer;
