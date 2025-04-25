import React from 'react';
import styled from 'styled-components';

const TabsContainer = styled.div`
  width: 100%;
`;

const TabList = styled.div`
  display: flex;
  border-bottom: 1px solid #ddd;
  margin-bottom: 1rem;
`;

const TabButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: ${props => props.active ? '#ff6b6b' : '#666'};
  border-bottom: 2px solid ${props => props.active ? '#ff6b6b' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const TabContent = styled.div`
  padding: 1rem 0;
`;

const Tabs = ({ tabs, activeTab, onTabChange }) => {
  return (
    <TabsContainer>
      <TabList>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </TabButton>
        ))}
      </TabList>
      <TabContent>
        {tabs.find(tab => tab.id === activeTab)?.content}
      </TabContent>
    </TabsContainer>
  );
};

export default Tabs; 