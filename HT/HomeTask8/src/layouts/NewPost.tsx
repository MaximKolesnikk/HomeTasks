import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { createExhibit } from '../api/exhibitActions';

const NewPost: React.FC = () => {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!image || !description) {
      alert('Please provide both description and image.');
      return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('image', image);

    try {
      await createExhibit(formData);
      alert('Post created successfully!');
    } catch (error) {
      console.error('Failed to create post:', error);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <Typography variant="h4" gutterBottom>Create New Post</Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ width: 400, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <Button variant="contained" component="label" color="primary">
          Choose File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Create Post
        </Button>
      </Box>
    </Box>
  );
};

export default NewPost;