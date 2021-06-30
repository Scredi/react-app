import React, { useState } from 'react';

const ListItem = ({id, username, picture, likeUser}) => {
  const [like, setLike] = useState(false);

  const handleLikeUser = (id) => {
    setLike(!like);
    likeUser(id);
  }

  return (
    <div className={like ? "list-item liked" : "list-item"}>
      <img alt="" src={picture}/>
      <div className="list-item__username" onClick={() => handleLikeUser(id)}>
        {username}
      </div>
    </div>
  );
}

export default ListItem;