import React, { useEffect, useReducer } from 'react';
import { getAll, search } from '../../services/waterService';
import Search from '../../components/Search/Search';
import Thumbnails from '../../components/Thumbnails/Thumbnails';
import { useParams } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import DarkWater from '../../components/WaterBackground/DarkWater';


const initialState = { waters: [] };

const reducer = (state, action) => {
  switch (action.type) {
    case 'WATER_LOADED':
      return { ...state, waters: action.payload };
    default:
      return state;
  }
};

export default function HomePage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { waters } = state;
  const { searchTerm } = useParams();

  useEffect(() => {
    const loadedWaters = searchTerm ? search(searchTerm) : getAll();
    loadedWaters.then((waters) =>
      dispatch({ type: 'WATER_LOADED', payload: waters })
    );
  }, [searchTerm]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <DarkWater />
      <Search />
      <div style={{ flex: 1 }}>
        {waters.length === 0 && (
          <NotFound message="Nothing found!" LinkText="Back To Homepage" />
        )}
        <Thumbnails waters={waters} />
      </div>
    </div>
  );
}
