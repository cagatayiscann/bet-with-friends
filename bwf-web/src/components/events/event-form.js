import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { CssTextField } from '../layout/elements'
import { Button } from '@material-ui/core'
import {DateTime} from 'luxon';
import { createEvent } from '../../services/event-services'
import { useAuth } from '../../hooks/useAuth';
import { NotificationManager } from 'react-notifications';
import ChevronLeft from '@mui/icons-material/ChevronLeft';

function EventForm() {

    const { authData } = useAuth();
    const { state } = useLocation();
    const { group } = state || {};
    const navigate = useNavigate()
    const [team1, setTeam1] = useState()
    const [team2, setTeam2] = useState()
    const [ time, setTime] = useState();

    const handleSubmit = async e => {
        e.preventDefault()

        console.log("Token:", authData.token);

        console.log('handling form submission...')
        console.log(team1, team2, time)
        const format = "yyyy-MM-dd'T'HH:mm";
        const utcTime = DateTime.fromFormat(time, format).toUTC().toFormat(format);
        const dataToSend = {team1, team2, 'time': utcTime, 'group': group.id}
        console.log('dataToSend:', dataToSend)
        const eventData = await createEvent(authData.token, dataToSend)
        console.log('Received response:', eventData)
        if(eventData){
            NotificationManager.success("Event created")
            navigate('/details/'+group)
        } else {
            NotificationManager.error("Error creating event")
        }
    }

  return (
    <div>
        <Link to={'/'}><ChevronLeft/></Link>
        <h1>New event for a group {group.id}</h1>
        <form onSubmit={handleSubmit}>
            <CssTextField label="team 1" onChange={e=> setTeam1(e.target.value)}  />
            <CssTextField label="team 2" onChange={e=> setTeam2(e.target.value)}/>
            <br/><br/>
            <CssTextField
                label="Date and time of event"
                type="datetime-local"
                InputLabelProps={{
                    shrink: true,
                }}
                onChange={e=> setTime(e.target.value)}
            />
            <br></br>
            <Button variant='contained' color='primary' type='submit'>Create Event</Button>

        </form>
    </div>
    
  )
}

<h1>New Event</h1>
export default EventForm