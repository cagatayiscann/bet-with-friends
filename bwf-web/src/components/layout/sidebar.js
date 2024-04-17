import React, { useEffect, useState} from 'react';
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import { auth } from '../../services/user-services'
import { useAuth } from '../../hooks/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import User from '../user/user';
import { CssTextField } from './elements';

function Sidebar() {

  let navigate = useNavigate();
  const [ username, setUsername] = useState('');
  const [ password, setPassword] = useState('');
  const { authData, setAuth } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    const data = await auth({username, password});
    setAuth(data);
  }

  const logout = () => {
    setAuth(null)
  }

  const account = () => {
    navigate('/account')
  }


  return (
    <div className="sidebar">
      {!authData ?
      <div>
        <form onSubmit={handleSubmit}>
          <Grid container stacing={1} alignItems="flex-end">
            <Grid Item>
              <AccountCircleIcon />
            </Grid>
            <Grid Item>
              <CssTextField id="imput-with-icon-grid" label="Username"
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
            <Grid Item>
              <KeyIcon />
            </Grid>
            <Grid Item>
              <CssTextField id="imput-with-icon-grid" label="Password" type="password"
              onChange={e => setPassword(e.target.value)}
              />
            </Grid>

          </Grid>

          <Button color="primary" variant='contained' type='submit'>
            Login
          </Button>
          <br/>
        </form>
        
          <Link to={'/register'}>
            Register here if you don't have an account yet
          </Link>
        </div>
      :
        <div>
          <User user={authData.user}/>
          <br></br>
          
          
          <Button color="primary" variant="contained" onClick={()=> account()}>
              My Account
          </Button>
          <Button color="primary" variant='contained' onClick={()=> logout()} >
            Logout
          </Button>
        </div>
  }
    </div>
  );
}

export default Sidebar;
