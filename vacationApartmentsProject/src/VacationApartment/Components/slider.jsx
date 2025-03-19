import Box from '@mui/joy/Box';
import Slider from '@mui/joy/Slider';
import { useEffect, useState } from 'react';


export default function RangeSlider({ filterBy, filter, setFilterBy, find, min, max }) {
  const [value, setValue] = useState([min, max]);

  useEffect(() => {
    const updateFilter = async () => {      
      await find();
    };

    updateFilter();
  }, [filterBy]);

  const handleChange = async (event, newValue) => {
    const numericValue = newValue.map(Number);

    console.log(numericValue[1]);
    if (filter === "price") {
      setFilterBy({ ...filterBy, minPrice: numericValue[0] , maxPrice: numericValue[1]});
    }
    if (filter === "beds") {
      setFilterBy({ ...filterBy, minBeds: numericValue[0], maxBeds: numericValue[1] });
    }
    console.log(filterBy);
    
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "200px", margin: "auto" }}>
      <Slider
        step={parseInt((max - min) / 10)}
        min={min}
        max={max}
        getAriaLabel={() => 'Temperature range'}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        color='neutral'
      />
    </Box>
  );
}
