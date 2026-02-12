/* import React, { useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchPosts, setPage } from '../store/slices/postSlice';
import { addComment, getComments } from '../api/commentActions';
import Post from '../components/Post';
import { io, Socket } from 'socket.io-client';
import { toast } from 'react-hot-toast';

const SOCKET_SERVER_URL = 'http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com';

const StripePage: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts.posts);
  const totalPages = useSelector((state: RootState) => state.posts.totalPages);
  const currentPage = useSelector((state: RootState) => state.posts.currentPage);


  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [dispatch, currentPage]);

  useEffect(() => {
    const socket: Socket = io(SOCKET_SERVER_URL);

    socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    socket.on('newPost', (newPost) => {
      toast(`Создан новый пост`, {
        position: 'top-center',
        style: {
          fontSize: '18px',
        },
      });

      console.log("newPost event received");


      if (currentPage === 1) {
        dispatch(fetchPosts(1));
      }
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket server');
    });

    return () => {
      socket.disconnect();
    };
  }, [dispatch, currentPage]);

  const handleAddComment = async (exhibitId: number, text: string) => {
    try {
      const newComment = await addComment(String(exhibitId), text);
      const updatedPosts = posts.map((post) =>
        post.id === exhibitId
          ? { ...post, comments: [...post.comments, newComment] }
          : post
      );

      dispatch({ type: 'posts/updatePosts', payload: updatedPosts });
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  return (
    <Box sx={{ padding: 3, backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={String(post.id)}
          image={post.imageUrl}
          description={post.description}
          isOwner={false}
          user={post.user}
          createdAt={post.createdAt}
          comments={post.comments || []}
          onDelete={() => console.log(`Delete exhibit with ID: ${post.id}`)}
          onViewComments={() => console.log(`View comments for exhibit with ID: ${post.id}`)}
          onAddComment={(text) => handleAddComment(post.id, text)}
        />
      ))}
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 3 }}>
        <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} />
      </Box>
    </Box>
  );
};

export default StripePage; */