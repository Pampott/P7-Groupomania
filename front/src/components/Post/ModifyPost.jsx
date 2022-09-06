import React, { useState } from 'react';
import { modifyPost } from './axiosFunctions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import {colors} from '../../styles/colors'
const ModifyPost = (post) => {
    const token = localStorage.getItem("token");
    const [file, setFile] = useState(post.post.imageUrl);
    const [message, setMessage] = useState(post.post.message);
    const [statusMessage, setStatusMessage] = useState("")
    function handleSubmit() {
        const newFormData = new FormData(document.getElementById("modifyingPost"));
        newFormData.append("imageUrl", file);
        newFormData.set("message", message);
        modifyPost(post.post._id, newFormData, token)
            .then(
                setStatusMessage("Publication modifiée !"),
                setTimeout(() => {
                    document.location.reload()
                }, 2000)
            )
            .catch(
                setStatusMessage("Modification échouée : vous n'êtes pas le propriétaire de ce post."),
                setTimeout(() => {
                    setStatusMessage(" ");
                }, 2000)
            );
    }

    return (
        <div style={{ transition: "all 0.3s", zIndex: "2" }}>

            <form id="modifyingPost" encType="multipart/form-data" >
                <label htmlFor="newMessage">Nouveau message: </label>
                <input type="text" onChange={(e) => setMessage(e.target.value)} />
                <label htmlFor="newImage" className='modifiedImage'>Nouvelle image <FontAwesomeIcon icon={faImage} /></label>
                <input type="file" onChange={(e) => setFile(e.target.files[0].name)} />
                <button type="submit" id="submit" onClick={(e) => { e.preventDefault(); handleSubmit()}}>
                    envoyer
                </button>
                <p className="modif-message" style={{fontSize: "15px", color: colors.primary, borderRadius: "5px", background: "#fff"}}>{statusMessage}</p>
            </form>

        </div>
    );
};

export default ModifyPost;