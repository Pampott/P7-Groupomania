import React from 'react';
import styled from "styled-components";

const PostContainer = styled.div`
border-top: 2px solid black;
`;
const GetPost = () => {
    return (
        <PostContainer>
            <div className="message-container">
                <p>Message dynamique</p>
            </div>
            <div className="img-container">
                <img src="" alt="ressource dynamique" />
            </div>
            <div className="action-container">
                <img src="" alt="like" />
                <div className="comments-number">
                    <img src="" alt="nombre de commentaires" />
                    <p>nombre dynamique de commentaires</p>
                    <div className="btn-comments">
                        <input type="button" value="Commenter" />
                    </div>
                </div>
            </div>
            <div className="comments-container">
                commentaires dynamiques
            </div>
        </PostContainer>
    );
};

export default GetPost;