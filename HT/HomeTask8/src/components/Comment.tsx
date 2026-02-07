import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CommentProps {
  user: string;
  text: string;
  canDelete: boolean;
  onDelete: () => void;
}

const Comment: React.FC<CommentProps> = ({ user, text, canDelete, onDelete }) => {
  return (
    <Box sx={{ backgroundColor: '#f5f5f5', padding: 1.5, borderRadius: 2, marginBottom: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Box>
        <Typography variant="subtitle2" fontWeight="bold" sx={{ color: 'black' }}>
          {user}
        </Typography>
        <Typography variant="body2" sx={{ marginBottom: 1 }}>
          {text}
        </Typography>
      </Box>
      {canDelete && (
        <IconButton size="small" color="secondary" onClick={onDelete} aria-label="delete">
          <DeleteIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default Comment;