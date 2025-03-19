import ListDetails from "./list"
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { useEffect, useState } from "react";
import Typography from '@mui/material/Typography';
import MoreDetails from "./moreDetails";
import { getWeather } from "../data/gets";
export const CardApartment = ({ apartment }) => {
  const [open, setOpen] = useState(false);
  let [weather, setWeather] = useState()
  useEffect(() => {
    getWeather(apartment.city.name).then((weather) =>
      setWeather(weather)
    ).catch((error) =>
      console.error('Error fetching weather:', error)
    );
  }, []);

  let imageUrl = ""
  if (apartment.image) {
    imageUrl = `data:image/jpeg;base64,${apartment.image.data}`;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return <>
    <div id="apartment_card" onClick={handleClickOpen} >
      <img minWidth={"400vw"} height={"200vw"} src={imageUrl} alt={apartment.name} />
      <Typography variant='h4'>{apartment.name}</Typography>
      <Typography>{apartment.description}</Typography>
      <div className="waether-container">
        {weather &&
          <>
            <Typography>{weather.temp}°C</Typography>
            <Typography>{weather.desc}</Typography>
            {weather.icon && <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="Weather Icon" />}
          </>
        }
      </div>
      {apartment.plugins.map((plugin, index) =>
        <>
          <Typography key={index}>{plugin}</Typography>
          <StarOutlineIcon color="#047F9A" />

        </>)}
      <ListDetails city={apartment.city.name} beds={apartment.countOfBeds} category={apartment.category.name}></ListDetails>
    </div>
    <MoreDetails apartment={apartment} open={open} handleClose={handleClose}></MoreDetails>
  </>
}
