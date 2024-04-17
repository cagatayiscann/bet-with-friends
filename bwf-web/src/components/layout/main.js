import { BrowserRouter, Routes, Route } from 'react-router-dom'
import GroupDetails from '../group/group-details';
import GroupList from '../group/group-list';
import Register from '../user/register';
import { useAuth } from '../../hooks/useAuth'
import Account from '../user/account';
import Event from '../events/event'
import EventForm from '../events/event-form'


function Main() {

  const { authData } = useAuth();


  return (
    <div className="main">
        
        <Routes>
          <Route path='/' element={<GroupList />} />
          <Route path='/register' element={<Register />}></Route>
          <Route path='/details/:id' element={<GroupDetails />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/event/:id' element={<Event />}></Route>
          <Route path='/event-form/' element={<EventForm />}></Route>
          
        </Routes>   
    </div>
  );
}

export default Main;
