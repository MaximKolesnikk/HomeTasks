import React from 'react';
import { Card, CardMedia, CardContent, Typography, CircularProgress, Box } from '@mui/material';
import { Character } from '../api/rickAndMortyApi';

interface HeroDetailProps {
  character?: Character | null;  
}

export default function HeroDetail({ character }: HeroDetailProps) {
  
  if (!character) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
        <Typography variant="body1" sx={{ ml: 2 }}>
          Завантаження деталей персонажа...
        </Typography>
      </Box>
    );
  }

  return (
    <Card sx={{
  maxWidth: '100%',
  boxShadow: 3,
  minHeight: '600px',            
  display: 'flex',
  flexDirection: 'column',
}}>
   <CardMedia
  component="img"
  height="450"                    
  image={character.image}
  alt={character.name}
  sx={{
    objectFit: 'cover',
    minHeight: '450px',           
    backgroundColor: '#e0e0e0',   
  }}
/>
      <CardContent>
        <Typography variant="h4" gutterBottom>
          {character.name}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Статус:</strong> {character.status}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Вид:</strong> {character.species}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Стать:</strong> {character.gender}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Походження:</strong> {character.origin?.name || 'Невідомо'}
        </Typography>
        <Typography variant="body1" paragraph>
          <strong>Локація:</strong> {character.location?.name || 'Невідомо'}
        </Typography>
      </CardContent>
    </Card>
  );
}
