import React, { useEffect, useState } from 'react';
import { Loader } from '../../styles/Atoms';
import { StyledMessage } from '../../styles/Atoms'
import { deletePost } from './axiosFunctions';

const DeletePost = (post) => {
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true);
    const [ok, setOk] = useState("")
    useEffect(() => {
        deletePost(post.post._id, token)
            .then((res) => res === 200
                ?
                (setOk("Publication supprimée !"), setTimeout(() => {
                    document.location.reload()
                }, 2000))
                : null)
            .catch(setOk("Vous ne pouvez pas supprimer ce post."))
            .finally(setIsLoading(false))
    }, [post.post._id, token])
    return (
        <div >
            {
                isLoading
                    ? <Loader />
                    : <StyledMessage className='statusMessage' style={{fontSize: "15px"}}>{ok}</StyledMessage>

            }
        </div>
    );
};

export default DeletePost;