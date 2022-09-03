import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { like } from './axiosFunctions';
import { colors } from '../../styles/colors';



const Like = ({ post }) => {
    const token = localStorage.getItem("token");
    const [liked, setLiked] = useState(false)
    return (
        <div style={{display: "flex", justifyContent: "center", fontSize: "25px"}}>
            <FontAwesomeIcon
                icon={faHeart}
                onClick={() => {
                    like(post._id, { like: 1 }, token)
                        .then(() => {setLiked(!liked)});

                }
                }
                className={liked ? "liked" : ""}
                style={
                    liked
                        ? { color: colors.primary, transform: "scale(1.2)", transition: "all 0.3s" }
                        : { color: colors.secondary, transform: "scale(1)", transition: "all 0.3s" }
                } />
        </div>
    )
};

export default Like;