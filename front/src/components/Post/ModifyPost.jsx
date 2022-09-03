import React, { useState } from 'react';
import { modifyPost } from './axiosFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
//import { StyledMessage } from '../../styles/Atoms';

const ModifyPost = (post) => {
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(post.post.imageUrl);
    const [message, setMessage] = useState(post.post.message);
    const [canModify, setCanModify] = useState(false);
    function handleSubmit() {
        const newFormData = new FormData(document.getElementById("modifyingPost"));
        newFormData.append("imageUrl", file);
        newFormData.set("message", message);
        modifyPost(post.post._id, newFormData, token)
            .then(() => {setCanModify(true);
                console.log(canModify)})
            .catch(setCanModify(false));
    }
    function statusMessage() {
        return canModify ? console.log("Modification effectuée !")  :  console.log("Vous ne pouvez pas modifier ce post.")
    }

    return (
        <div style={{ transition: "all 0.3s", zIndex: "2" }}>

            <form id="modifyingPost" encType="multipart/form-data" >
                <label htmlFor="newMessage">Nouveau message: </label>
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <label htmlFor="newImage" className='modifiedImage'>Nouvelle image <FontAwesomeIcon icon={faImage} /></label>
                <input type="file" onChange={(e) => setFile(e.target.files[0].name)} />
                <button type="submit" id="submit" onClick={(e) => { e.preventDefault(); handleSubmit(); statusMessage()}}>
                    envoyer
                </button>


            </form>

        </div>
    );
};

export default ModifyPost;