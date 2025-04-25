import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCines, clearError } from "./cineSlice";
import styled from "styled-components";

const CineListContainer = styled.div`
  padding: 2rem;
  margin-top: 84px;
  display: grid;
  width: 100%;
  align-items: center;
`;

const CineGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const CineCard = styled.div`
  background: #ffffff;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CineTitle = styled.h3`
  color: #333;
  margin-bottom: 0.5rem;
`;

const CineTexts = styled.p`
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

const CineList = () => {
  const dispatch = useDispatch();
  const { cines, status, error } = useSelector((state) => state.cines);

  useEffect(() => {
    dispatch(fetchCines());
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  if (status === "loading") {
    return <LoadingMessage>Carregando cinemas...</LoadingMessage>;
  }

  if (status === "failed") {
    return <ErrorMessage>Erro ao carregar os cinemas: {error}</ErrorMessage>;
  }

  if (!cines?.data) {
    return <LoadingMessage>Nenhum cinema encontrado</LoadingMessage>;
  }
  console.log({ cines });
  return (
    <CineListContainer>
      <h2>Lista de Cinemas</h2>
      <CineGrid>
        {cines.data.map((cine) => (
          <CineCard key={cine.id}>
            <CineTitle>Cinema: {cine.cine_name}</CineTitle>
            <CineTexts></CineTexts>
            <strong>Estado:</strong> {cine.state}
            <CineTexts>
              <strong>Cidade:</strong> {cine.city}
            </CineTexts>
          </CineCard>
        ))}
      </CineGrid>
    </CineListContainer>
  );
};

export default CineList;
