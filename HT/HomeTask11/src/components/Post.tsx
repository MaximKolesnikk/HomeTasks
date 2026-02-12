import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import Comment from './Comment';
import { getComments, addComment, deleteComment } from '../api/commentActions';

interface CommentData {
  id: string;
  user: { id: string; username: string };
  text: string;
}

interface User {
  id: string;
  username: string;
}

interface PostProps {
  id: string;
  image: string;
  description: string;
  isOwner: boolean;
  user: User;
  createdAt: string;
  onDelete: () => void;
  onViewComments: () => void;
}

const Post: React.FC<PostProps> = ({ id, image, description, isOwner, user, createdAt, onDelete, onViewComments }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<CommentData[]>([]);
  const [currentUserId, setCurrentUserId] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const userId = localStorage.getItem('userId') || '';
      setCurrentUserId(userId);
    }
  }, []);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsData = await getComments(id);
        setComments(commentsData);
      } catch (error) {
        console.error('Ошибка при получении комментариев:', error);
      }
    };
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && !localStorage.getItem('token')) {
      router.push('/login');
      return;
    }
    if (commentText.trim()) {
      try {
        const newComment = await addComment(id, commentText);
        setComments([...comments, newComment]);
        setCommentText('');
      } catch (error) {
        console.error('Ошибка при добавлении комментария:', error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(id, commentId);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      console.error('Ошибка при удалении комментария:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', backgroundColor: '#e0e0e0', padding: 2 }}>
      <Card sx={{ width: 600, marginBottom: 2, backgroundColor: '#fff', boxShadow: 3, minHeight: 500 }}>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {user.username} - {new Date(createdAt).toLocaleString()}
          </Typography>
        </CardContent>
        <CardMedia
          component="img"
          image={`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${image}`}
          alt="exhibit image"
          sx={{ height: 300, objectFit: 'cover' }}
        />
        <CardContent>
          <Typography variant="body1" color="text.primary" sx={{ marginBottom: 1 }}>
            {description}
          </Typography>
          <Button onClick={onViewComments} sx={{ textTransform: 'none' }}>View Comments</Button>
          {isOwner && (
            <Button onClick={onDelete} sx={{ textTransform: 'none', marginLeft: 1, color: 'red' }}>
              Delete
            </Button>
          )}
        </CardContent>
        <CardContent>
          <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
            Comments: {comments.length}
          </Typography>
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              user={comment.user.username}
              text={comment.text}
              canDelete={comment.user.id === currentUserId}
              onDelete={() => handleDeleteComment(comment.id)}
            />
          ))}
          <Box component="form" onSubmit={handleCommentSubmit} sx={{ display: 'flex', alignItems: 'center', marginTop: 2 }}>
            <TextField
              variant="outlined"
              size="small"
              placeholder="Write a comment..."
              required
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              sx={{ flexGrow: 1, marginRight: 1 }}
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Post;