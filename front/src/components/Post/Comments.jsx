import React /*{ useEffect, useState }*/ from 'react';

const Comments = (post) => {

    return (
        <div>
            {post.post.comments?.map(comment => {
                return <div key={post.post._id + comment.text}>
                    <p>{comment.commenterName}</p>
                    <p>{comment.text}</p>
                    <p>{comment.date}</p>
                    <div className="actions">
                        <button>Supprimer</button>
                    </div>
                </div>
            })}
        </div>
    );
};

export default Comments;