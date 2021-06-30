const ListItem = ({username, picture}) => {
  return (
    <div className="list-item">
      <img alt="" src={picture}/>
      <div>{username}</div>
    </div>
  );
}

export default ListItem;