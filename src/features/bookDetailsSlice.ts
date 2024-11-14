import { getBook } from "@/api/books";
import { BookDetails, Review } from "@/types/BookDetails";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addReview as apiAddReview } from "@/api/books";

export interface BookState {
  bookDetails: BookDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: BookState = {
  bookDetails: null,
  loading: false,
  error: null,
};

export const fetchBook = createAsyncThunk(
  'bookDetails/fetchBook',
  async (id : number) => {
    const bookFromServer = await getBook(id);

    return bookFromServer;
  },
);

export const addReview = createAsyncThunk(
  'bookDetails/addReview',
  async ({ bookId, userId, rating, title, comment }: { bookId: number; userId: number; rating: number; title: string; comment: string }) => {

    const response = await apiAddReview(bookId, userId, rating, title, comment) as Review;
    return response;
  }
);

export const bookDetailsSlice = createSlice({
  name: 'bookDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchBook.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBook.fulfilled, (state, action) => {
        state.loading = false;
        state.bookDetails = action.payload;
      })
      .addCase(fetchBook.rejected, (state, action) => {
        state.error = action.error.message || 'Error in fetching data';
        state.loading = false;
      })
      .addCase(addReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        if (state.bookDetails) {
          state.bookDetails.reviews.push(action.payload);
        }
      })
      .addCase(addReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Error adding review";
      });
  },
});

export default bookDetailsSlice.reducer;
