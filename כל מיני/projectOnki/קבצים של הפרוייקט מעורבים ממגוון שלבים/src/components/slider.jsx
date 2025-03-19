import * as React from 'react';
import Slider from '@mui/material/Slider';

export default function InputSlider({filter,compare,value, setValue,min, max}) {
  console.log(compare);
  

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
    filter(newValue,compare);
  };


  return (

          <Slider sx={{ width: 300 }}
            value={value}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            min={min}
            max={max}
            valueLabelDisplay="on"
          />

  );
}
