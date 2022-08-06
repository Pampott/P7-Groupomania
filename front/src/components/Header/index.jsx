import { Link } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import styled from 'styled-components';

const StyledLogo = styled.img`
height: 100px;
width: 300px;
object-fit: cover;
`
const HeaderWrapper = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const StyledNav = styled.nav`
    margin-right: 10px;
`
const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
    padding: 0 20px;
    &:hover {
        color: #FD2D01

    }
`

function Header() {
    return(
        <header>
            <HeaderWrapper>
                <Link to='/'>
                    <StyledLogo src={logo}/>
                </Link>
                <StyledNav>
                    <StyledLink to='/signup'>S'inscrire</StyledLink>
                    <StyledLink to='/login'>Se connecter</StyledLink>
                </StyledNav>
            </HeaderWrapper>
        </header>
    )
};

export default Header;