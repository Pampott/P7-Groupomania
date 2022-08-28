import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMessage } from '@fortawesome/free-solid-svg-icons';
import { Loader } from "../../styles/Atoms";
import '../../pages/Posts/index.css'
import Comments from './Comments';
import { colors } from '../../styles/colors';
import ModifyPost from './ModifyPost';


const Card = ({ post }) => {
    //
    const user = localStorage.getItem("user");
    let userObject = JSON.parse(user)
    const [isLoading, setIsLoading] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const [checkModify, setCheckModify] = useState(false)
    //const [isLiked, setIsLiked] = useState(false);
    useEffect(() => {
        post && setIsLoading(false)
    }, [post]);
    function commentToggle() {
        let toggle = document.querySelector(".comments-toggle");
        toggle.classList.toggle("active");
        toggle.classList.contains("active") ? setShowComments(true) : setShowComments(false)
    }

    function Modify() {
        userObject.id === post.posterId ? setCheckModify(true) : setCheckModify(false)
    }

    return (
        <div className="card-container" key={post._id}>
            {isLoading ? (
                <Loader />) : (
                <>
                    <div className='poster-info'>
                        <p>{post.firstName} {post.lastName}</p>
                    </div>
                    <div className="post-info">
                        {post.message ? (<h2>{post.message}</h2>) : null}
                        {post.imageUrl ? (<img src={post.imageUrl} alt={post.imageUrl} />) : null}
                    </div>
                    <div className="actions">
                        <div className="likes">
                            <FontAwesomeIcon icon={faHeart} style={{ color: colors.secondary }} />
                            <p>{post.likes}</p>
                        </div>
                        <div className="comments">
                            <FontAwesomeIcon icon={faMessage} className="comments-toggle" onClick={commentToggle} />
                            {showComments ? <Comments post={post} /> : null}
                        </div>
                        <div className="editComment">
                            <textarea name="edit" id="commentEdit" cols="30" rows="3" placeholder='Ecrire...' />
                            <input htmlFor="edit" type="submit" value="envoyer" />
                        </div>
                        <div className="admin">
                            <ul>
                                <li onClick={(e) => { e.preventDefault(); Modify() }}>Modifier la publication
                                </li>
                                <li>Supprimer la publication</li>
                            </ul>
                            {checkModify
                                ? <ModifyPost post={post} />
                                : (<div>Vous n'avez pas l'autorisation de modifier ce post.</div>)
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