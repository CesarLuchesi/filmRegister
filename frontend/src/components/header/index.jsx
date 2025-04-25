import React from 'react';
import { Link } from 'react-router';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #1a1a1a;
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Logo = styled(Link)`
  color: #ffffff;
  font-size: 1.5rem;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: #ff6b6b;
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
`;

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 1rem;
  transition: color 0.3s ease;
  position: relative;

  &:hover {
    color: #ff6b6b;
  }

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background-color: #ff6b6b;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <Logo to="/">FILM REGISTER</Logo>
      <Nav>
        <NavLink to="/cinemas">Cinemas</NavLink>
        <NavLink to="/filmes">Filmes</NavLink>
        <NavLink to="/sessao">Sessões</NavLink>
        <NavLink to="/cadastrar">Cadastrar</NavLink>
      </Nav>
    </HeaderContainer>
  );
};

export default Header;
