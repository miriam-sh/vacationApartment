import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBy({filter,count,compare,setCompare}) {

  const handleChange = (event) => {
    console.log(event.target.value);
    
    setCompare(event.target.value);
    filter(count,event.target.value);
  };
  return (
    <Box >
      <FormControl size='small'>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={compare}
          onChange={handleChange}
        >
          <MenuItem value={"Bigger"}>:יותר מ</MenuItem>
          <MenuItem value={"Smaller"}>:פחות מ</MenuItem>
          <MenuItem value={"Equal"}>:שווה ל</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
