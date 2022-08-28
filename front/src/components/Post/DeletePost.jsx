import React, { useEffect, useState } from 'react';
import { Loader } from '../../styles/Atoms';
import { deletePost } from './axiosFunctions';

const DeletePost = () => {
    const user = localStorage.getItem("user");
    let userObject = JSON.parse(user);
    const token = localStorage.getItem("token");
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        deletePost(userObject.id, token).then((res) => console.log(res)).catch(console.error).finally(setIsLoading(false))
    }, [token, userObject.id])

    return (
        <div>
            {isLoading ? <Loader /> : <div>Publication supprimée !</div>}
            DeletePost
        </div>
    );
};

export default DeletePost;