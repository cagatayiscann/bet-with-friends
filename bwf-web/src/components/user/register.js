import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Grid, TextField } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import EmailIcon from '@material-ui/icons/Email';
import { auth } from '../../services/user-services'
import { useAuth } from '../../hooks/useAuth'
import { register } from '../../services/user-services'

function Register() {

    const [ username, setUsername] = useState('');
    const [ password, setPassword] = useState('');
    const [ password2, setPassword2] = useState('');
    const [ email, setEmail] = useState('');
    const { authData, setAuth } = useAuth();
    let navigate = useNavigate()

    const passMatch = () => {
        return password === password2
    }

    const handleSubmit = async e => {
        e.preventDefault();
        if(passMatch()){
            const regData = await register({username, email, password, profile: {is_premium: false}})
            if(regData){
              const data = await auth({username, password});
              setAuth(data);
              navigate("/account")
            }
        } else {
            console.log('pass dont match')
        }
      }

  return (
    <div>
        <form onSubmit={handleSubmit}>
          <Grid container stacing={1} alignItems="flex-end">
            <Grid Item>
              <AccountCircleIcon />
            </Grid>
            <Grid Item>
              <TextField id="imput-with-icon-grid" label="Username" 
                onChange={e => setUsername(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <KeyIcon />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Password" type="password" 
                onChange={ e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <KeyIcon />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Repeat password" type="password" 
                onChange={ e => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <EmailIcon />
            </Grid>
            <Grid item>
              <TextField id="input-with-icon-grid" label="Email"  
                onChange={ e => setEmail(e.target.value)}
              />
            </Grid>
          </Grid>
          

          <Button color="primary" variant='contained' type='submit'>
            Register
          </Button>
          <br/>
          
        </form>
    </div>

  )
}

export default Register