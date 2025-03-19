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
          <Avatar sx={{ bgcolor: "white", borderColor: '#047F9A' }}>
            <HotelIcon sx={{ color: '#047F9A' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#047F9A', textAlign: "right" }} primary={beds + "מיטות "} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "white", borderColor: '#047F9A' }}>
            <LocationOnIcon sx={{ color: '#047F9A' }}></LocationOnIcon>
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#047F9A', textAlign: "right" }} primary={city} />
      </ListItem>
      <ListItem>
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: "white", borderColor: '#047F9A' }}>
            <HomeIcon sx={{ color: '#047F9A' }} />
          </Avatar>
        </ListItemAvatar>
        <ListItemText sx={{ color: '#047F9A', textAlign: "right" }} primary={category} />
      </ListItem>
    </List>
  );
}
