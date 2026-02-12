import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { deleteExhibitById, getUserExhibits } from '../api/exhibitActions';
import { addComment, getComments } from '../api/commentActions';
import Post from '../components/Post';

const MyExhibits: React.FC = () => {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchExhibits = async () => {
      try {
        const response = await getUserExhibits();
        const exhibitData = await Promise.all(
          response.data.map(async (exhibit: any) => {
            const commentsResponse = await getComments(exhibit.id);
            return { ...exhibit, comments: commentsResponse.data || [] };
          })
        );
        setExhibits(exhibitData);
      } catch (error) {
        console.error('Failed to fetch user exhibits:', error);
      }
    };
    fetchExhibits();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    try {
      await deleteExhibitById(id);
      setRefresh(!refresh);
    } catch (error) {
      console.error('Failed to delete exhibit:', error);
    }
  };

  const handleAddComment = async (exhibitId: string, text: string) => {
    try {

      const newComment = await addComment(exhibitId, text);


      setExhibits((prevExhibits) =>
        prevExhibits.map((exhibit) =>
          exhibit.id === exhibitId
            ? { ...exhibit, comments: [...(exhibit.comments || []), newComment] }
            : exhibit
        )
      );
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  return (
    <Box sx={{ backgroundColor: '#e0e0e0', minHeight: '100vh', padding: 3 }}>
      {exhibits.map((exhibit) => (
        <Post
          key={exhibit.id}
          id={exhibit.id}
          image={exhibit.imageUrl}
          description={exhibit.description}
          isOwner={true}
          user={exhibit.user}
          createdAt={exhibit.createdAt}
          comments={exhibit.comments || []}
          onDelete={() => handleDelete(exhibit.id)}
          onViewComments={() => console.log(`View comments for exhibit with ID: ${exhibit.id}`)}
          onAddComment={(text) => handleAddComment(exhibit.id, text)}
        />
      ))}
    </Box>
  );
};

export default MyExhibits;