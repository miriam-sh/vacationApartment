import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectBy({filter,count,compare,setCompare}) {

  const handleChange = (event) => {    
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
