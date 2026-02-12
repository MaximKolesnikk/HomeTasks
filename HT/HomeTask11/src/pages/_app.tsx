import React, { useEffect } from 'react';
import { AppProps } from 'next/app';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster, toast } from 'react-hot-toast';
import io from 'socket.io-client';
import ControlBar from '../components/ControlBar';
import store, { RootState } from '../store/store';
import { fetchPosts, addPost } from '../store/slices/postSlice';
import Initializer from '../components/Initializer';

const SOCKET_SERVER_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/notifications';

const AppContent: React.FC<AppProps> = ({ Component, pageProps }) => {
  const isAuthenticated = useSelector((state: RootState) => state.user.isAuthenticated);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL);

    socket.on('newPost', (newPost) => {
      toast('Создан новый пост', {
        style: {
          fontSize: '18px',
          padding: '16px',
        },
        position: 'top-center',
      });

      dispatch(addPost(newPost));
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  useEffect(() => {
    if (!isAuthenticated && (router.pathname === '/new-post' || router.pathname === '/my-exhibits')) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  return (
    <>
      <CssBaseline />
      <ControlBar isAuthenticated={isAuthenticated} />
      <Toaster position="top-center" reverseOrder={false} />
      <Component {...pageProps} />
    </>
  );
};

const MyApp: React.FC<AppProps> = (props) => {
  return (
    <Provider store={store}>
      <Initializer />
      <AppContent {...props} />
    </Provider>
  );
};

export default MyApp;
