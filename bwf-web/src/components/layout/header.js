import React, { useEffect, useState} from 'react';
import logo from '../../assets/logo_frame.png'
import { Link } from 'react-router-dom'


function App() {

  return (
    <div className="header">
      
      <Link to="/"> 
        <img src={logo} alt="BWF logo" height="158" />
      </Link>
    </div>
  );
}

export default App;
