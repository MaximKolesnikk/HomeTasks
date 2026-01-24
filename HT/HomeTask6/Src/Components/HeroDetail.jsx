import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";

export default function HeroDetail() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get(
          `https://rickandmortyapi.com/api/character/${id}`,
        );
        setCharacter(response.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading)
    return <CircularProgress sx={{ margin: "100px auto", display: "block" }} />;
  if (!character)
    return <Typography variant="h6">Персонажа не знайдено</Typography>;

  return (
    <Card sx={{ maxWidth: "100%", boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="450"
        image={character.image}
        alt={character.name}
        sx={{ objectFit: "cover" }}
      />
      <CardContent>
        <Typography variant="h4">{character.name}</Typography>
        <Typography variant="body1">
          <strong>Статус:</strong> {character.status}
        </Typography>
        <Typography variant="body1">
          <strong>Вид:</strong> {character.species}
        </Typography>
        <Typography variant="body1">
          <strong>Стать:</strong> {character.gender}
        </Typography>
        <Typography variant="body1">
          <strong>Походження:</strong> {character.origin?.name || "Невідомо"}
        </Typography>
        <Typography variant="body1">
          <strong>Локація:</strong> {character.location?.name || "Невідомо"}
        </Typography>
      </CardContent>
    </Card>
  );
}
