import React, { useState } from 'react';
import { modifyPost } from './axiosFunctions';


const ModifyPost = (post) => {
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(post.post.imageUrl);
    const [message, setMessage] = useState(post.post.message);
    function handleSubmit() {
        const newFormData = new FormData(document.getElementById("modifyingPost"))
        newFormData.append("imageUrl", file);
        newFormData.set("message", message);
        modifyPost(post.post._id, newFormData, token).then((res) => console.log(res)).catch(console.error);
        window.location.reload();

    }
    return (
        <div>
            <form id="modifyingPost" action="" encType="multipart/form-data">
                <label htmlFor="newMessage">Nouveau message: </label>
                <input type="text" onChange={(e) => setMessage(e.target.value)}/>
                <label htmlFor="newImage">Nouvelle image:</label>
                <input type="file"  onChange={(e) => setFile(e.target.files[0].name)}/>
                <button type="submit" onClick={(e) => { e.preventDefault() ; handleSubmit()}}>envoyer</button>
            </form>
        </div>
    );
};

export default ModifyPost;