import React, { useState } from "react";
import styled from "styled-components";
import FilmForm from "./FilmForm";
import CinemaForm from "./CinemaForm";
import SessionForm from "./SessionForm";

const PageContainer = styled.div`
  padding: 2rem;
  margin-top: 84px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
`;

const TabsContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 2rem;
`;

const TabButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${(props) => (props.active ? "#ff6b6b" : "#666")};
  border-bottom: 2px solid
    ${(props) => (props.active ? "#ff6b6b" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  text-align: center;
  padding: 1rem;
  background-color: #fff5f5;
  border-radius: 4px;
  margin: 1rem 0;
`;

const RegisterPage = () => {
  const [activeTab, setActiveTab] = useState("film");
  const [error, setError] = useState(null);

  const tabs = [
    { id: "film", label: "Cadastrar Filme", component: FilmForm },
    { id: "cinema", label: "Cadastrar Cinema", component: CinemaForm },
    { id: "session", label: "Cadastrar Sessão", component: SessionForm },
  ];

  const renderTabContent = () => {
    try {
      const activeTabData = tabs.find((tab) => tab.id === activeTab);
      if (!activeTabData) return null;

      const Component = activeTabData.component;
      return <Component />;
    } catch (err) {
      console.error("Erro ao renderizar conteúdo da aba:", err);
      setError(
        "Ocorreu um erro ao carregar o formulário. Por favor, tente novamente."
      );
      return null;
    }
  };

  return (
    <PageContainer>
      <Title>Cadastro</Title>
      <TabsContainer>
        <TabList>
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => {
                setError(null);
                setActiveTab(tab.id);
              }}
            >
              {tab.label}
            </TabButton>
          ))}
        </TabList>
        <TabContent>
          {error ? <ErrorMessage>{error}</ErrorMessage> : renderTabContent()}
        </TabContent>
      </TabsContainer>
    </PageContainer>
  );
};

export default RegisterPage;
