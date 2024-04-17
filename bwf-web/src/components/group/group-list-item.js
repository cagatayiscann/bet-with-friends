import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from 'react-router-dom';
import PlaceIcon from '@mui/icons-material/Place';

const useStyles = makeStyles((theme) => ({
  container: {
    textAlign: 'left',
    border: '2px solid #fff',
    borderRadius: '1rem',
    padding: '0 1rem',
    display: 'grid',
    gridTemplateColumns: '1fr',
    marginBottom: '1rem',
    cursor: 'pointer', // Add a pointer cursor for indicating clickability
  },
  name: {
    color: theme.palette.primary.main
  }
}));

function GroupListItem({ group }) {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleItemClick = () => {
    // Assuming you want to navigate to a details page with the group's ID
    navigate(`/details/${group.id}`);
  };

  return (
    <div onClick={handleItemClick} className={classes.container}>
      <h3>
        <span className={classes.name}>{group.name}</span>
        : <PlaceIcon/> {group.location}
      </h3>
    </div>
  );
}

export default GroupListItem;
