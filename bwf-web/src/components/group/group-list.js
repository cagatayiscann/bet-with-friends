import React, { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { getGroups } from '../../services/group-services'
import GroupListItem from './group-list-item'
import { useNavigate } from 'react-router-dom'

function GroupList() {

  const [groups, setGroups] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  let navigate = useNavigate();

  useEffect(()=>{
    setLoading(true)
    const getData = async () => {
      await getGroups().then( data => {
        setLoading(false)
        setGroups(data)
      })
    }
    getData()
  }, [])

  if (error) return <h1>Error</h1>
  if (loading) return <h1>Loading...</h1>



  return (
    <div>
        { groups && groups.map(group => {
            return <GroupListItem key={group.id} group={group}/>
            
        })}
    </div>
  );
}

export default GroupList;
