import React, { useState } from 'react';

const ListItem = ({username, picture}) => {
  const [like, setLike] = useState(false);

  const handleLikeUser = () => {
    setLike(!like);
  }

  return (
    <div className={like ? "list-item liked" : "list-item"}>
      <img alt="" src={picture}/>
      <div className="list-item__username" onClick={() => handleLikeUser()}>{username}</div>
    </div>
  );
}

export default ListItem;