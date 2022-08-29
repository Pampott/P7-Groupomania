import React, { useEffect, useState } from 'react';
import { Loader } from '../../styles/Atoms';
import { deletePost } from './axiosFunctions';

const DeletePost = (post) => {
    const user = localStorage.getItem("user");
    let userObject = JSON.parse(user);
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        deletePost(post.post._id,userObject.id, userObject.role, token).then((res) => console.log(res)).catch(console.error).finally(setIsLoading(false))
    }, [post.post._id,userObject.id, userObject.role, token])

    return (
        <div>
            {isLoading ? <Loader /> : <div>Publication supprimée !</div>}
        </div>
    );
};

export default DeletePost;