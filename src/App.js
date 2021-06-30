import React, { useState, useEffect } from 'react';
import ListItem from './components/ListItem';
import InputSearch from './components/InputSearch';
import Loader from './components/Loader';

const App = () => {
  const [data, setData] = useState([])
  , [isLoading, setLoading] = useState(true)
  , [filteredData, setFilteredData] = useState([])
  , [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (value) => {
    setSearchTerm(value);
  }

  const resetSearch = () => {
    setSearchTerm('');
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

    const json = await response.json();

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
            />
          )) : filteredData.map(item => (
            <ListItem
              key={item.id}
              {...item}
            />
          ))
        }
      </div>
    </div>
  );
}

export default App;
