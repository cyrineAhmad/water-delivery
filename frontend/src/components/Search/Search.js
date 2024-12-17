import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function Search({
  searchRoute = '/search/', 
  defaultRoute = '/', 
  margin, 
  placeholder = 'Search for your favorite water...'
}) {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm || '');
  }, [searchTerm]);

  const search = () => {
    navigate(term ? searchRoute + term : defaultRoute); 
  };

  return (
    <div className={classes.container} style={{ margin }}>
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setTerm(e.target.value)}
        onKeyUp={(e) => e.key === 'Enter' && search()}
        value={term}
      />
      <button className={classes.searchButton} onClick={search}> <FontAwesomeIcon icon={faMagnifyingGlass} /></button>
    </div>
  );
}
