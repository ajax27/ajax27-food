import React, {useState} from 'react';
import Axios from 'axios';
import './App.css';
import {v4 as uuidv4} from 'uuid';
import Recipe from './components/Recipe';
import Alert from './components/Alert';

const App = () => {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState('');

  const APP_ID = '0eaf3b69';
  const APP_KEY = 'c13a445abf78838cbf2acd74b0cdf201';

  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== '') {
      const result = await Axios.get(url);
      if (!result.data.more) {
        return setAlert('No food with such name');
      }
      console.log(result);
      setRecipes(result.data.hits);
      setQuery('');
      setAlert('');
    } else {
      setAlert('Please fill the form');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    getData();
  };

  const onChange = e => {
    setQuery(e.target.value);
  };

  return (
    <div className="App">
      <h1>Food Recipes Search App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== '' && <Alert alert={alert} />}
        <input
          type="text"
          name="query"
          value={query}
          placeholder="Search food recipes..."
          autoComplete="off"
          onChange={onChange}
        />
        <input type="submit" value="search" />
      </form>
      <div className="recipes">
        {recipes !== [] &&
          recipes.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};

export default App;
