import { useDispatch, useSelector } from 'react-redux';
import { login, logout, updateAccessToken } from '@/redux/features/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  
  // Redux state'ini alıyoruz
  const { isAuthenticated, accessToken, username, refreshToken } = useSelector(state => state.auth);

  // Giriş fonksiyonu
  const handleLogin = (accessToken, refreshToken, username) => {
    dispatch(login({ accessToken, refreshToken, username }));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleUpdateToken = (accessToken) => {
    dispatch(updateAccessToken(accessToken));
  };

  return {
    isAuthenticated,
    accessToken,
    refreshToken,
    username,
    handleLogin,
    handleLogout,
    handleUpdateToken,
  };
};
