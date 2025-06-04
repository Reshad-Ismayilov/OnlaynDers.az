import { createSlice } from '@reduxjs/toolkit';

// Helper – localStorage'a yaz
const saveToLocalStorage = (state) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authState', JSON.stringify(state));
  }
};

// Helper – localStorage'dan oxu
const loadStateFromLocalStorage = () => {
  if (typeof window !== 'undefined') {
    const storedState = localStorage.getItem('authState');
    if (storedState) {
      return JSON.parse(storedState);
    }
  }
  return {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    username: null,
  };
};

// Başlanğıc vəziyyət
const initialState = loadStateFromLocalStorage();

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      saveToLocalStorage(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.accessToken = null;
      state.refreshToken = null;
      state.username = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
      }
    },
    updateAccessToken: (state, action) => {
      state.accessToken = action.payload;
      saveToLocalStorage(state);
    },
    updateRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      saveToLocalStorage(state);
    },
  },
});

export const {
  login,
  logout,
  updateAccessToken,
  updateRefreshToken,
} = authSlice.actions;

export default authSlice.reducer;
