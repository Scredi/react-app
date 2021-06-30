const ListItem = ({username, picture}) => {
  return (
    <div className="list-item">
      <img alt="" src={picture}/>
      <div className="list-item__username">{username}</div>
    </div>
  );
}

export default ListItem;