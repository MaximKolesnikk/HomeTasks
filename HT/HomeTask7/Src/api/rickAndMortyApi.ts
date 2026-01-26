import axios from 'axios';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export interface CharactersResponse {
  info: { count: number; pages: number; next: string | null; prev: string | null };
  results: Character[];
}

export const getCharacters = (page: number = 1): Promise<CharactersResponse> =>
  axios.get(`https://rickandmortyapi.com/api/character?page=${page}`).then(res => res.data);

export const getCharacterById = (id: number): Promise<Character> =>
  axios.get(`https://rickandmortyapi.com/api/character/${id}`).then(res => res.data);