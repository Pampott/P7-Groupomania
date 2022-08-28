import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Loader } from "../../styles/Atoms";
import '../../pages/Posts/index.css'
import Comments from './Comments';
import { colors } from '../../styles/colors';
import ModifyPost from './ModifyPost';
import Like from './Like';
import DeletePost from './DeletePost';


const Card = ({ post }) => {
    const user = localStorage.getItem("user");
    let userObject = JSON.parse(user);
    const [isLoading, setIsLoading] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [checkModify, setCheckModify] = useState(false);
    const [showAdmin, setShowAdmin] = useState(false)
    const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        post && setIsLoading(false)
    }, [post]);
    function commentToggle() {
        let toggle = document.querySelector(".comments-toggle");
        toggle.classList.toggle("active");
        toggle.classList.contains("active") ? setShowComments(true) : setShowComments(false)
    }

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
        
    }


    return (
        <div className="card-container" key={post._id}>
            {isLoading ? (
                <Loader />) : (
                <>
                    <p>{post.createdAt}</p>
                    <div className='poster-info'>
                        <p>{post.firstName} {post.lastName}</p>
                    </div>
                    <div className="post-info">
                        {post.message ? (<h2>{post.message}</h2>) : null}
                        {post.imageUrl ? (<img src={post.imageUrl} alt={post.imageUrl} />) : null}
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
                        <div className="comments">
                            <FontAwesomeIcon icon={faMessage} focusable={true} className="comments-toggle" onClick={commentToggle} />
                            {showComments ? <Comments post={post} /> : null}
                        </div>
                        <div className="editComment">
                            <textarea name="edit" id="commentEdit" cols="30" rows="3" placeholder='Ecrire...' />
                            <input htmlFor="edit" type="submit" value="envoyer" />
                        </div>
                        <div className="admin">
                            <FontAwesomeIcon icon={faEllipsisVertical} focusable={true} className="adminToggle" onClick={adminToggle} />
                            {showAdmin ? (<ul>
                                <li onClick={(e) => { e.preventDefault(); modify() }}>Modifier la publication
                                </li>
                                <li onClick={(e) => { e.preventDefault(); deletePost()}}>Supprimer la publication</li>
                            </ul>
                            ) : (null)}
                            {checkModify
                                ? <ModifyPost post={post} />
                                : (<div>Vous n'avez pas l'autorisation de modifier ce post.</div>)
                            }
                            <DeletePost />
                        </div>


                    </div>
                </>
            )

            }
        </div>
    );
};

export default Card;