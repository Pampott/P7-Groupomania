import React from 'react';

const Likes = (likes) => {
    return (
        <div className='likes-wrapper' key={likes}>
          <div className="icon heart">coeur</div>
            <p>{likes}</p>  
        </div>
    );
};

export default Likes;