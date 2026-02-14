import React, { useEffect } from 'react';
import { Box, Pagination, CircularProgress, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchPosts, setPage, addCommentThunk } from '../store/slices/postSlice';
import Post from '../components/Post';
import { toast } from 'react-hot-toast';

const StripePage: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector((state: RootState) => state.posts.posts);
  const totalPages = useSelector((state: RootState) => state.posts.totalPages);
  const currentPage = useSelector((state: RootState) => state.posts.currentPage);
  const status = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    dispatch(fetchPosts(currentPage));
  }, [dispatch, currentPage]);


  useEffect(() => {
    if (status === 'failed' && error) {
      toast.error(error || 'Не удалось загрузить посты');
    }
  }, [status, error]);

  const handleAddComment = (exhibitId: number, text: string) => {
    if (!text.trim()) {
      toast.error('Комментарий не может быть пустым');
      return;
    }

    dispatch(addCommentThunk({ exhibitId: String(exhibitId), text }))
      .unwrap()
      .then(() => {
        toast.success('Комментарий добавлен');
      })
      .catch((err) => {
        console.error('Ошибка добавления:', err);
        toast.error(err || 'Не удалось добавить комментарий');
      });
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(setPage(value));
  };

  if (status === 'loading') {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} thickness={4} color="primary" />
      </Box>
    );
  }

  if (status === 'failed') {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="error">
          Ошибка загрузки постов
        </Typography>
        <Typography color="text.secondary">
          {error || 'Попробуйте обновить страницу'}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 3, backgroundColor: '#e0e0e0', textAlign: 'center', minHeight: '100vh' }}>
      {posts.length === 0 && (
        <Typography variant="h6" sx={{ my: 4 }}>
          Пока нет постов
        </Typography>
      )}

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
          onDelete={() => console.log(`Delete ${post.id}`)}
          onViewComments={() => console.log(`View comments ${post.id}`)}
          
        />
      ))}

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 4 }}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      )}
    </Box>
  );
};

export default StripePage;