import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Loader } from "../../styles/Atoms";
import '../../pages/Posts/index.css'
import { colors } from '../../styles/colors';
import ModifyPost from './ModifyPost';
import Like from './Like';
import DeletePost from './DeletePost';


const Card = ({ post }) => {
    const user = localStorage.getItem("user");
    let userObject = JSON.parse(user);
    const [isLoading, setIsLoading] = useState(true);
    const [checkModify, setCheckModify] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false)
    const [isLiked, setIsLiked] = useState(false);
    const [deleted, setDeleted] = useState(false)
    useEffect(() => {
        post && setIsLoading(false)
    }, [post]);

    function modify() {
        userObject.id === post.posterId ? setCheckModify(true) : setCheckModify(false)
    }

    function adminToggle() {
        let adminToggle = document.querySelector(".adminToggle");
        adminToggle.classList.toggle("adminActive")
        adminToggle.classList.contains("adminActive") ? setShowAdmin(true) : setShowAdmin(false)
    }

    function likeToggle() {
        let likeToggle = document.querySelector(".likeToggle");
        likeToggle.classList.toggle("liked");
        likeToggle.classList.contains("liked") ? setIsLiked(true) : setIsLiked(false);
    }

    function deletePost() {
        let deleteBtn = document.querySelector(".deleteBtn");
        deleteBtn.addEventListener("click", () => {
            setDeleted(!deleted);
        })
    }


    return (
        <div className="card-container" key={post._id}>
            {isLoading ? (
                <Loader />) : (
                <>
                    <p className='date'>{post.createdAt}</p>
                    <p className='poster-info'>{post.firstName} {post.lastName}</p>
                    <div className="post-info">
                        {post.message ? (<h2>{post.message}</h2>) : null}
                        {post.imageUrl ? (<img className="card-image" src={post.imageUrl} alt={post.imageUrl} />) : null}
                    </div>
                    <div className="actions">
                        <div className="likes">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="likeToggle"
                                style={isLiked
                                    ?
                                    { color: colors.primary, transform:"scale(1.1)",transition: "all .2s" }
                                    :
                                    { color: colors.secondary, transition: "all .3s" }}
                                onClick={likeToggle} />
                            { isLiked ? <Like post={post} /> : post.likes}
                        </div>
                        <div className="admin">
                            <FontAwesomeIcon icon={faEllipsisVertical} focusable={true} className="adminToggle" onClick={adminToggle} />
                            {showAdmin ? (<ul className="actions">
                                <li className="modifyBtn actions-btn"onClick={(e) => { e.preventDefault(); modify() }}>Modifier la publication
                                </li>
                                <li className="deleteBtn actions-btn" onClick={(e) => { e.preventDefault(); deletePost()}}>{deleted ? <DeletePost post={post} /> : "Supprimer la publication"}</li>
                            </ul>
                            ) : (null)}
                            {checkModify
                                ? <ModifyPost post={post}/>
                                : (null)
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