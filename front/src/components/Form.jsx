import React from 'react';
import styled from 'styled-components';
import {colors} from '../styles/colors';

const StyledWrapper = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const StyledForm = styled.form`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: ${colors.tertiary}
`
const Form = () => {
    return (
        <StyledWrapper>
            <h1>Connexion</h1>
            <StyledForm action="post" method="post">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" id="password" />
                <button type="submit">Envoyer</button>
            </StyledForm>
        </StyledWrapper>
    );
};

export default Form;
