import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.svg';
import styled from 'styled-components';
import { colors } from '../styles/colors';

const StyledLogo = styled.img`
    width: 95%;
    height: 200px;
`
const ColumnNav = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 2fr 100px;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    justify-items: center;
    align-items: center;
`

const StyledTitle = styled.h1`
    color: ${colors.tertiary}
`

const StyledList = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
`
const StyledLink = styled(NavLink)`
    text-decoration: none;
    color: ${colors.tertiary};
    padding: 10px 20px;
    background: #fff;
    border: ${colors.tertiary} 2px solid;
    border-radius: 15px;
    transition: all 0.4s;
    &:hover {
        color: #fff;
        background: ${colors.primary};
        transition: all 0.4s;
    }
`
const Navigation = () => {
    return (
        <header className='navigation'>
            <ColumnNav className='navigation__list'>
                <NavLink to="/">
                    <StyledLogo className='logo' src={logo} alt="Groupomania logo" />
                </NavLink>
                <StyledTitle>Bienvenue !</StyledTitle>
                <StyledList className="links-wrapper">
                    <StyledLink className="link" to="/signup">
                        M'inscrire
                    </StyledLink>
                    <StyledLink className="link" to='/login'>
                        Me connecter
                    </StyledLink>
                </StyledList>
            </ColumnNav>
        </header>
    );
};

export default Navigation;