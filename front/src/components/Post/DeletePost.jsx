import React, { useEffect, useState } from 'react';
import { Loader } from '../../styles/Atoms';
import { StyledMessage } from '../../styles/Atoms'
import { deletePost } from './axiosFunctions';

const DeletePost = (post) => {
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const [deleted, setDeleted] = useState(false);
    useEffect(() => {
        deletePost(post.post._id, token)
            .then(setDeleted(true))
            .catch(setDeleted(false))
            .finally(setIsLoading(false))
    }, [post.post._id, token])
    return (
        <div >
            {
                isLoading 
                ? <Loader /> 
                :  deleted 
                    ? (<StyledMessage>Publication supprimée !</StyledMessage> && window.location.reload())
                    : <StyledMessage>Vous ne pouvez pas supprimer cette publication</StyledMessage>
            }
        </div>
    );
};

export default DeletePost;