import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import io, { Socket } from 'socket.io-client';
import { addPost } from '../store/slices/postSlice';
import { toast } from 'react-hot-toast';

const SOCKET_SERVER_URL = 'https://playground.zenberry.one/notifications';

export const useNotificationSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const dispatch = useDispatch();

  useEffect(() => {
 
    if (!socketRef.current) {
      socketRef.current = io(SOCKET_SERVER_URL, {
        autoConnect: true,
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
      });

      socketRef.current.on('connect', () => {
      
      });

      socketRef.current.on('newPost', (newPost) => {
        toast('Создан новый пост', {
          style: {
            fontSize: '18px',
            padding: '16px',
          },
          position: 'top-center',
        });

        dispatch(addPost(newPost));
      });

      socketRef.current.on('connect_error', (err) => {
        console.warn('Socket connection error:', err.message);
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [dispatch]); 

  return socketRef.current;
};