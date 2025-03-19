import ListDetails from "./list"
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useState } from "react";
import Typography from '@mui/material/Typography';
import MoreDetails from "./moreDetails";
export const CardApartment = ({apartment}) =>
{
  const [open, setOpen] = useState(false);
  let imageUrl =""
  if(apartment.image){
   imageUrl=`data:image/jpeg;base64,${apartment.image.data}` ;
  }

  const handleClickOpen = () => {      
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
    return<>
        <div id="apartment_card" onClick={handleClickOpen} >
          <img width={"300vw"} height={"200vw"} src={imageUrl} alt={apartment.name} />
          <Typography variant = 'h4'>{apartment.name}</Typography>
          <Typography>{apartment.description}</Typography>
          {apartment.plugins.map((plugin, index) =>
          <>
           <Typography key={index}>{plugin}</Typography>
           <StarOutlineIcon color="primary" />
           
           </>)}
          <ListDetails city={apartment.city.name} beds={apartment.countOfBeds} category={apartment.category.name}></ListDetails>
        </div>
        <MoreDetails apartment={apartment} open={open} handleClose={handleClose}></MoreDetails>
    </>
    }
    