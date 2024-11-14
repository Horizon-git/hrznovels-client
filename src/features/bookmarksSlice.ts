/* eslint-disable no-param-reassign */
import { getBookmarks, toggleBookmark as toogleBookmarkApi } from '@/api/bookmarks';
import { Bookmark, BookmarkToogleRes } from '@/types/Bookmark';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BookmarksState {
  bookmarks: Bookmark[];
  loading: boolean;
  error: string | null;
}

const initialState: BookmarksState = {
  bookmarks: [],
  loading: false,
  error: null,
};

export const fetchBookmarks = createAsyncThunk(
  'bookmarks/fetchBookmarks',
  async (userId: number) => {
    const bookmarksFromServer = await getBookmarks(userId);

    return bookmarksFromServer;
  },
);

export const toggleBookmarkAsync = createAsyncThunk(
  'bookmarks/toggleBookmark',
  async ({ bookId, userId }: { bookId: number; userId: number }, { rejectWithValue }) => {
    try {
      const response = await toogleBookmarkApi(bookId, userId);
      return response;
    } catch (error) {
      return rejectWithValue('Failed to toggle bookmark');
    }
  }
);

export const bookmarksSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBookmarks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBookmarks.fulfilled, (state, action) => {
        state.loading = false;
        state.bookmarks = action.payload;
      })
      .addCase(fetchBookmarks.rejected, (state, action) => {
        state.error = action.error.message || 'Error in fetching data';
        state.loading = false;
      })
      .addCase(toggleBookmarkAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(toggleBookmarkAsync.fulfilled, (state, action: PayloadAction<BookmarkToogleRes>) => {
        state.loading = false;
        const { status, bookmark, book_id } = action.payload;

        if (status === 'added' && bookmark) {
          state.bookmarks.push(bookmark);
          console.log('Bookmark added');
        } else if (status === 'removed') {
          state.bookmarks = state.bookmarks.filter(b => b.book_id !== book_id);
          console.log('Bookmark removed');
        }
      })
      .addCase(toggleBookmarkAsync.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export default bookmarksSlice.reducer;
