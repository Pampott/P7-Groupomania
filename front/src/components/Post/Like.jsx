import React from 'react';
import { useEffect } from 'react';
import { like } from './axiosFunctions';


const Like = (post) => {
    const user = localStorage.getItem("user");
    let userObject = JSON.parse(user);
    const token = localStorage.getItem("token")
    useEffect(() => {
        like(post.post_id, userObject.id,token).then((res) => console.log(res)).catch(console.error) 
    })
    return (
        <div>
            {post.post.likes}
        </div>
    );
};

export default Like;