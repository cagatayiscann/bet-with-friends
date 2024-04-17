import React, { useState} from 'react';
import { Link } from 'react-router-dom'
import { Button, Grid, TextField } from '@material-ui/core';
import KeyIcon from '@mui/icons-material/Key';
import { uploadAvatar } from '../../services/user-services'
import { useAuth } from '../../hooks/useAuth'
import { changePass } from '../../services/user-services'
import { NotificationManager} from 'react-notifications';
import { CssTextField } from '../layout/elements';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

function Account() {

    
    const [ image, setImage ] = useState();
    const { authData, setAuth } = useAuth();
    const [ oldPassword, setOldPassword] = useState('');
    const [ password, setPassword] = useState('');
    const [ password2, setPassword2] = useState('');

    const passMatch = () => {
      return password === password2;
    }

    const uploadFile = async e => {
        e.preventDefault();
        const uploadData = new FormData();
        uploadData.append('image', image, image.name)

        const uploaded = await uploadAvatar(authData.user.profile.id, uploadData)
        if(uploaded){
          NotificationManager.success("Image has been uploaded.");
        }else{
          NotificationManager.warning("Error.")
        }
      }
    
      const submitChangePass = async e => {
        e.preventDefault();
        if(passMatch()){
          const passData = await changePass(
            {old_password: oldPassword, new_password: password},
            authData.user.id,
            authData.token
            );
          if(passData){
            NotificationManager.success("Password have been changed");
          }
        } else {
          NotificationManager.warning("Password don't match.")
        }
      }

  return (
    <div>
        <Link to='/'><ChevronLeft/></Link>
        
        <h1>Change your picture</h1>
        <form onSubmit={uploadFile}>
          <label>
            <p>Upload your avatar</p>
            <CssTextField type='file' onChange={e => setImage(e.target.files[0])} />
          </label>
          <Button type='submit' variant='contained' color='primary'>Upload File</Button>
        </form>
        <br/>

        <h1>Change your password</h1>
        <form onSubmit={submitChangePass}>
          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <KeyIcon />
            </Grid>
            <Grid item>
              <CssTextField id="input-with-icon-grid" label="Old Password" type="password" 
                onChange={ e => setOldPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <KeyIcon />
            </Grid>
            <Grid item>
              <CssTextField id="input-with-icon-grid" label="New Password" type="password" 
                onChange={ e => setPassword(e.target.value)}
              />
            </Grid>
          </Grid>

          <Grid container spacing={1} alignItems="flex-end">
            <Grid item>
              <KeyIcon />
            </Grid>
            <Grid item>
              <CssTextField id="input-with-icon-grid" label="Repeat password" type="password" 
                onChange={ e => setPassword2(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type='submit' variant='contained' color='primary'>Change password</Button>
          
        </form>
    </div>

  )
}

export default Account