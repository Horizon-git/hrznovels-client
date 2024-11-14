import { login, refreshTokens } from '@/api/auth';
import { AppDispatch } from '@/store/store';
import { LoginData, UserInfo } from '@/types/AuthData';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type AuthState = {
  user: UserInfo | null;
  isChecked: boolean;
  error: string | undefined;
};

const initialState: AuthState = {
  user: null,
  isChecked: false,
  error: undefined,
};

export const loginAsync = createAsyncThunk('auth/login', async (
  {
    email,
    password,
  }: LoginData
) => {
  const response = await login({ email, password });

  const { accessToken, refreshToken, user } = response;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  console.log(user);

  return user;
});

export const checkAuthAsync = createAsyncThunk('auth/checkAuth', async () => {
  const refreshStorage = localStorage.getItem('refreshToken') || '';

  if (!refreshStorage) {
    return null;
  }

  const response = await refreshTokens(refreshStorage);

  const { accessToken, refreshToken, user } = response;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);

  return user;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = undefined;
        state.isChecked = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.error = action.error.message;
        state.isChecked = true;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export const { logout, setUser } = authSlice.actions;

export default authSlice.reducer;

// export const loginAsync = async (
//   {
//     email,
//     password,
//   }: {
//     email: string;
//     password: string;
//   },
//   dispatch: AppDispatch,
// ) => {
//   const response = await login({ email, password });

//   const { accessToken, refreshToken, user } = response;

//   localStorage.setItem('accessToken', accessToken);
//   localStorage.setItem('refreshToken', refreshToken);

//   dispatch(setUser(user));
// };
