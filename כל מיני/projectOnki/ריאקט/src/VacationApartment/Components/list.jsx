import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
export default function ListDetails({ category, beds, city }) {
  return (
    <List sx={{ width: '100%', display: "flex" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "white", borderColor: '#fb2576' }}>
            <HotelIcon sx={{ color: '#fb2576' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#fb2576', textAlign: "right" }} primary={"מיטות " + beds} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "white", borderColor: '#fb2576' }}>
            <LocationOnIcon sx={{ color: '#fb2576' }}></LocationOnIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#fb2576', textAlign: "right" }} primary={city} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "white", borderColor: '#fb2576' }}>
            <HomeIcon sx={{ color: '#fb2576' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#fb2576', textAlign: "right" }} primary={category} />
      </ListItem>
    </List>
  );
}
