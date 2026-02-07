import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';

interface CommentData {
  id: string;
  user: string;
  date: string;
  text: string;
}

interface CommentStripeProps {
  comments: CommentData[];
  onAddComment: (text: string) => void;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ comments, onAddComment }) => {
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment('');
    }
  };

  return (
    <Box sx={{ marginTop: 2, padding: 2, borderTop: '1px solid #ccc', backgroundColor: '#f9f9f9' }}>
      <Typography variant="h6" sx={{ fontSize: '0.85rem', marginBottom: 1 }}>Comments: {comments.length}</Typography>
      
      {comments.map((comment) => (
        <Comment key={comment.id} user={comment.user} date={comment.date} text={comment.text} />
      ))}
      
      <Box display="flex" alignItems="center" mt={2}>
        <TextField
          variant="outlined"
          placeholder="Write a comment..."
          size="small"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ flexGrow: 1, fontSize: '0.85rem' }}
        />
        <IconButton color="primary" onClick={handleAddComment}>
          <SendIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CommentStripe;