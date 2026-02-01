import { getChapter } from "@/api/chapter";
import { ChapterDetails } from "@/types/ChapterDetails";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface ChapterState {
  chapterDetails: ChapterDetails | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChapterState = {
  chapterDetails: null,
  loading: false,
  error: null,
};

export const fetchChapter = createAsyncThunk(
  'chapterDetails/fetchChapter',
  async (id : number) => {
    const chapterFromServer = await getChapter(id);

    return chapterFromServer;
  },
);


export const chapterDetailsSlice = createSlice({
  name: 'chapterDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchChapter.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChapter.fulfilled, (state, action) => {
        state.loading = false;
        state.chapterDetails = action.payload;
      })
      .addCase(fetchChapter.rejected, (state, action) => {
        state.error = action.error.message || 'Error in fetching data';
        state.loading = false;
      });
  },
});

export default chapterDetailsSlice.reducer;
