import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store/store';
import ControlBar from './components/ControlBar';
import LoginPage from './layouts/LoginPage';
import RegisterPage from './layouts/RegisterPage';
import StripePage from './layouts/StripePage';
import NewPost from './layouts/NewPost';
import MyExhibits from './layouts/MyExhibits';
import { Toaster, toast } from 'react-hot-toast';
import { useNotificationSocket } from './hooks/useSocket';


const SOCKET_SERVER_URL = 'https://playground.zenberry.one/notifications';

const App: React.FC = () => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  useNotificationSocket();


  return (
    <Router>
      <CssBaseline />
      <ControlBar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route path="/" element={<StripePage />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <RegisterPage /> : <Navigate to="/" />} />
        <Route path="/new-post" element={isAuthenticated ? <NewPost /> : <Navigate to="/login" />} />
        <Route path="/my-exhibits" element={isAuthenticated ? <MyExhibits /> : <Navigate to="/login" />} />
      </Routes>
      <Toaster position="top-center" reverseOrder={false} />
    </Router>
  );
};

export default App;