import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Weather from '../Features/Weather/Weather.jsx';

export default () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Weather />
      </Toolbar>
    </AppBar>
  );
};
