import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';

export default function ToFilter({ setApartments, list, filter, getAllApartments }) {
  const [value, setValue] = React.useState(filter)
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }} id='apartmentsDirection'>
      <Typography
        id="segmented-controls-example"
        sx={{ fontWeight: 'lg', fontSize: 'sm' }}
      >
      </Typography>
      <RadioGroup
        orientation="horizontal"
        aria-labelledby="segmented-controls-example"
        name="search"
        value={value}
        onChange={(event) => {
          setApartments(event.target.value)
          setValue(event.target.value)
          if (event.target.value == -1) {
            console.log("pp");
            getAllApartments()
          }
        }}
        sx={{
          minHeight: 48,
          padding: '4px',
          borderRadius: '12px',
          bgcolor: '#ededed',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
        }}
      >
        {list.map((item) => (
          <Radio
            key={item._id}
            color="neutral"
            value={item._id}
            disableIcon
            label={item.name}
            variant="plain"
            sx={{
              px: 2, alignItems: 'center', '&:hover': {
                color: "white",
              }
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'white',
                    color: '#fb2576',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: '#fb2576',
                      //  color:"white",
                    },
                  }),
                  '&:hover': {
                    bgcolor: '#fb2576',
                    color: "white",
                  }
                },
              }),
            }}
          />
        ))}
        <Radio
          key={15}
          color="neutral"
          value={-1}
          disableIcon
          label={"הכל"}
          variant="plain"
          sx={{ px: 2, alignItems: 'center' }}
          slotProps={{
            action: ({ checked }) => ({
              sx: {
                ...(checked && {
                  bgcolor: 'background.surface',
                  boxShadow: 'sm',
                  '&:hover': {
                    bgcolor: 'background.surface',

                  },
                }),
              },
            }),
          }}
        />
      </RadioGroup>
    </Box>
  );
}
