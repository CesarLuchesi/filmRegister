import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFilms, clearError } from "./filmSlice";
import styled from "styled-components";

const FilmListContainer = styled.div`
  padding: 2rem;
  margin-top: 84px;
`;

const FilmGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const FilmCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const FilmTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const FilmTexts = styled.p`
  color: #333;
  margin: 0.25rem 0;
`;

const LoadingMessage = styled.p`
  text-align: center;
  color: #666;
`;

const ErrorMessage = styled.p`
  color: #ff6b6b;
  text-align: center;
`;

const FilmList = () => {
  const dispatch = useDispatch();
  const { films, status, error } = useSelector((state) => state.film);

  useEffect(() => {
    dispatch(fetchFilms());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingMessage>Carregando filmes...</LoadingMessage>;
  }

  if (status === "failed") {
    return <ErrorMessage>Erro ao carregar filmes: {error}</ErrorMessage>;
  }

  if (!films?.data) {
    return <LoadingMessage>Nenhum filme encontrado</LoadingMessage>;
  }

  return (
    <FilmListContainer>
      <h2>Lista de Filmes</h2>
      <FilmGrid>
        {films.data.map((film) => (
          <FilmCard key={film.id}>
            <FilmTitle>{film.film_name}</FilmTitle>
            <FilmTexts><strong>Gênero:</strong> {film.gender}</FilmTexts>
            <FilmTexts><strong>Duração:</strong> {film.duration} minutos</FilmTexts>
            <FilmTexts><strong>Classificação:</strong> {film.classification}</FilmTexts>
            <FilmTexts><strong>Lançamento:</strong> {new Date(film.launch).toLocaleDateString()}</FilmTexts>
            <FilmTexts><strong>Sinopse:</strong> {film.synopsis}</FilmTexts>
          </FilmCard>
        ))}
      </FilmGrid>
    </FilmListContainer>
  );
};

export default FilmList;
