// import * as React from 'react';
// import Slider from '@mui/material/Slider';

// export default function InputSlider({find,filter,value, setFilterBy,filterBy}) {
  

  import Box from '@mui/joy/Box';
  import Slider from '@mui/joy/Slider';
  import * as React from 'react';

  
  export default function RangeSlider({filterBy,filter,setFilterBy,find,min,max}) {
    const [value, setValue] = React.useState([min, max]);
  
  React.useEffect(() => {
    const updateFilter = async () => {
      console.log(filterBy);
      await find();
    };

    updateFilter();
  }, [filterBy]);
  
    const handleChange = (event, newValue) => {
        const numericValue = newValue.map(Number); // המרת כל ערך ל-number  
        console.log(numericValue);      
        if (filter === "price")
        {
          setFilterBy({ ...filterBy, minPrice: numericValue[0] });
          setFilterBy({...filterBy, maxPrice: numericValue[1] });
        }
        if (filter === "beds")
        {
          setFilterBy({ ...filterBy, munBeds: numericValue[0] });
          setFilterBy({...filterBy, maxBeds: numericValue[1] });
        }
        setValue(newValue);
    };
  
    return (
      <Box sx={{ width: 300 }}>
        <Slider
          // sx={{bgcolor:'#05A3B2'}}
          step={parseInt((max-min)/10)}
          min={min-1}
          max={max+1}
          getAriaLabel={() => 'Temperature range'}
          value={value}
          onChange={handleChange}
          valueLabelDisplay="on"
          // getAriaValueText={value}
        />
      </Box>
    );
  }
  

//   return (

//           <Slider sx={{ width: 300 }}
//             value={value}
//             onChange={handleSliderChange}
//             aria-labelledby="input-slider"
//             valueLabelDisplay="on"
//           />

//   );
// }
