import React, { useEffect, useState } from 'react';
import { Loader } from '../../styles/Atoms';
import { deletePost } from './axiosFunctions';

const DeletePost = (post) => {
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        deletePost(post.post._id, token).then((res) => console.log(res)).catch(console.error).finally(setIsLoading(false))
    }, [post.post._id, token])

    return (
        <div>
            {isLoading ? <Loader /> : <div>Publication supprimée !</div>}
        </div>
    );
};

export default DeletePost;