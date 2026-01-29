import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DARK_BLUE = '#192746';
const WHITE = '#FFFFFF';

const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 1000;

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 50px;
  box-sizing: border-box;

  background-color: ${({ $isScrolled }) =>
    $isScrolled ? WHITE : 'transparent'};

  color: ${({ $isScrolled }) =>
    $isScrolled ? DARK_BLUE : WHITE};

  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? '0 4px 12px rgba(0,0,0,0.1)' : 'none'};

  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  cursor: pointer;
`;

const NavLinks = styled.ul`
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  font-weight: 500;

  a {
    color: inherit;
    text-decoration: none;
    transition: opacity 0.2s ease;
  }

  a:hover {
    opacity: 0.7;
  }
`;

const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;

  background-color: ${({ $isScrolled }) =>
    $isScrolled ? DARK_BLUE : 'transparent'};

  color: ${({ $isScrolled }) =>
    $isScrolled ? WHITE : WHITE};

  border: 2px solid
    ${({ $isScrolled }) =>
      $isScrolled ? DARK_BLUE : WHITE};

  transition:
    background-color 0.3s ease,
    color 0.3s ease,
    border-color 0.3s ease;

  &:hover {
    background-color: ${({ $isScrolled }) =>
      $isScrolled ? '#1E293B' : WHITE};
    color: ${({ $isScrolled }) =>
      $isScrolled ? WHITE : DARK_BLUE};
  }
`;


const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavContainer $isScrolled={isScrolled}>
      <Logo>Brand.</Logo>

      <NavLinks>
        <NavItem><a href="#home">Home</a></NavItem>
        <NavItem><a href="#explore">Explore</a></NavItem>
        <NavItem><a href="#community">Community</a></NavItem>
      </NavLinks>

      <ActionButton $isScrolled={isScrolled}>
        Get Started
      </ActionButton>
    </NavContainer>
  );
};

export default NavBar;
