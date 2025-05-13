import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { FaSackDollar } from "react-icons/fa6";

export default function MoreDetails({ open, handleClose, apartment }) {

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {apartment.name}
        </DialogTitle>
        <DialogContent>
          <section id="alert-dialog">
            {/* <div>
          {apartment && apartment.plugins.map((plugin, index) =>
                <>
                  <Typography key={index}>{plugin}</Typography>
        
                </>
              )}</div> */}

          <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
          <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <FaSackDollar />
                </Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ textAlignLast: "right", marginRight: "10px" }} primary="מחיר" secondary={"₪"+apartment.price} />

            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LocalPhoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ textAlignLast: "right", marginRight: "10px" }} primary="טלפון" secondary={apartment.advertiser.phone} />

            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PhoneIphoneIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ textAlignLast: "right", marginRight: "10px" }} primary="וואצאפ" secondary={apartment.advertiser.anotherPhone} />
            </ListItem>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <EmailIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText sx={{ textAlignLast: "right", marginRight: "10px" }} primary="מייל" secondary={apartment.advertiser.email} />
            </ListItem>
          </List>
          </section>
        </DialogContent>
        <DialogActions>
          <Button sx={{ marginLeft: "auto", marginRight: "auto" }} onClick={handleClose} autoFocus>
            סגור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
