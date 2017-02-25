import React from 'react';
import localStyles from './GroupStyles.css';
import { sortUsers } from '../../redux/actions/sortActions';
import { Button } from 'react-onsenui';

const SortGroup = ({ dispatch }) => {
  const icons = [
    { path:'a-z-icon.png', method: 'sortAZ' },
    { path: 'fence-icon.png', method: 'geofence' },
    { path: 'radar-icon.png', method: 'proximity' }
  ];
  const iconWidth = (window.innerWidth / icons.length) - (10 / icons.length);
  return (
    <div className={localStyles.icon}>
      {icons.map((icon, index) => (
        <Button
          key={index}
          style={{ width: iconWidth}}
          onClick={() => dispatch(sortUsers(icon.method))}>
          <img src={'./img/' + icon.path}/>
        </Button>
      ))}
    </div>
  );
}

export default SortGroup;