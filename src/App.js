import React, { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import InputSearch from './components/InputSearch';
import Loader from './components/Loader';

const App = () => {
  const [data, setData] = useState([])
  , [isLoading, setLoading] = useState(true)
  , [filteredData, setFilteredData] = useState([])
  , [likedUsers, setLikedUsers] = useState(JSON.parse(localStorage.getItem('likedUsers')) || [])
  , [searchTerm, setSearchTerm] = useState('');

  const handleLikeUser = (id) => {
    const exists = likedUsers.includes(id);

    if (exists) {
      setLikedUsers(likedUsers.filter(item => item !== id));
    } else {
      setLikedUsers([...likedUsers, id]);
    }
  }

  const handleInputChange = (value) => {
    setSearchTerm(value);
  }

  const resetSearch = () => {
    setSearchTerm('');
  }

  const mapData = (array, order) => {
    array.map((item) => {
      if (order.includes(item.id)) {
        item.isLiked = true;
      }
      return item;
    })

    return array;
  }

  const getData = async () => {
    const response = await fetch('./dummy.json',
      {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );

    if (!response.ok) {
      console.log(response.status);
    }

    let json = await response.json();

    if (likedUsers && likedUsers.length > 0) {
      json = mapData(json, likedUsers, 'id');
    }

    setTimeout(() => {
      setLoading(false);
      setData(json);
    }, 1500)
  }

  useEffect(() => {
    getData();
  }, [])

  useEffect(() => {
    setFilteredData(data.filter(item => item.username.toLowerCase().includes(searchTerm.toLowerCase())))
  }, [searchTerm])

  useEffect(() => {
    localStorage.setItem('likedUsers', JSON.stringify(likedUsers));
  }, [likedUsers])

  return (
    <div className="App">
      <div className="search">
        <InputSearch
          searchTerm={searchTerm}
          handleChange={handleInputChange}
        />
        <button onClick={resetSearch}>Effacer</button>
      </div>
      { isLoading && <Loader /> }
      <div className="list-container">
        {
          filteredData.length <= 0 ?
          data.map(item => (
            <ListItem
              key={item.id}
              {...item}
              likeUser={handleLikeUser}
            />
          )) : filteredData.map(item => (
            <ListItem
              key={item.id}
              {...item}
              likeUser={handleLikeUser}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
