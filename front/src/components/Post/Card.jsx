import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash} from '@fortawesome/free-solid-svg-icons';
import { Loader } from "../../styles/Atoms";
import '../../pages/Posts/index.css'
import ModifyPost from './ModifyPost';
import Like from './Like';
import DeletePost from './DeletePost';


const Card = ({ post }) => {

    const [isLoading, setIsLoading] = useState(true);
    const [showModify, setShowModify] = useState(false);
    const [deleted, setDeleted] = useState(false)

    function modifyToggle() {
        let toggleBtn = document.querySelector(".modifyBtn")
        toggleBtn.classList.toggle("modifying")
        toggleBtn.classList.contains("modifying")
        ? setShowModify(true)
        : setShowModify(false)
    }

    function deleteToggle() {
        let toggleBtn = document.querySelector(".deleteToggle")
        toggleBtn.classList.toggle("delete")
        toggleBtn.classList.contains("delete")
        ? setDeleted(true)
        : setDeleted(false)
    }
    useEffect(() => {
        post && setIsLoading(false)
    }, [post]);

    return (
        <div className="card-container" key={post._id}>
            {isLoading ? (
                <Loader />) : (
                <>
                    <p className='date'>{post.createdAt}</p>
                    <p className='poster-info'>{post.firstName} {post.lastName}</p>
                    <div className="post-info">
                        {post.message ? (<h2>{post.message}</h2>) : null}
                        {post.imageUrl ? (<img className="card-image" src={post.imageUrl} alt={post.imageUrl} loading="lazy"/>) : null}
                    </div>
                    <div className="actions">
                        <Like post={post} />
                        <div className="admin">
                            <FontAwesomeIcon icon={faPenToSquare} focusable='true' className="modifyBtn btn-action" onClick={modifyToggle} />
                            {
                                showModify ? <ModifyPost post={post} /> : null
                            }
                            <FontAwesomeIcon icon={faTrash} focusable='true' className="deleteToggle btn-action" onClick={deleteToggle} />
                            {
                                deleted ? <DeletePost post={post} /> : null
                            }
                               
                        </div>


                    </div>
                </>
            )

            }
        </div>
    );
};

export default Card;