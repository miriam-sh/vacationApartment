import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import { useEffect, useState } from 'react';

export default function ToFilter({ list, filter, find, filterBy, setFiterBy, val }) {
  const [value, setValue] = useState(val)

  useEffect(() => {
    const updateFilter = async () => {
      await find();
    };

    updateFilter();
  }, [filterBy]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, margin: "auto" }} id='apartmentsDirection'>

      <RadioGroup
        aria-labelledby="segmented-controls-example"
        name="search"
        value={value}
        onChange={async (event) => {
          setValue(event.target.value)
          if (filter === "city") {
            if (event.target.value == -1)
              setFiterBy({ ...filterBy, city: undefined });
            else
              await setFiterBy({ ...filterBy, city: event.target.value });
          }
          else if (filter === "category") {
            if (event.target.value == -1)
              setFiterBy({ ...filterBy, category: undefined });
            else
              await setFiterBy({ ...filterBy, category: event.target.value });
          }
        }}
        sx={{
          padding: '4px',
          borderRadius: '12px',
          bgcolor: '#ededed',
          '--RadioGroup-gap': '4px',
          '--Radio-actionRadius': '8px',
          margin: "auto",
          width: "100px",
        }}
      >
        <Radio
          key={15}
          color="neutral"
          value={-1}
          disableIcon
          label={"הכל"}
          variant="plain"
          sx={{ px: 2, alignItems: 'center', height: "40px", width: "90px", margin: "auto" }}
          slotProps={{
            action: ({ checked }) => ({
              sx: {
                ...(checked && {
                  bgcolor: 'background.surface',
                  boxShadow: 'sm',
                  '&:hover': {
                    bgcolor: '#05A3B2',

                  },
                }),
              },
            }),
          }}
        />
        {list.map((item) => (
          <Radio
            key={item._id}
            color="neutral"
            value={item._id}
            disableIcon
            label={item.name}
            variant="plain"
            sx={{
              px: 2, alignItems: 'center', height: "40px", width: "90px", margin: "auto", '&:hover': {
                color: "white",
              }
            }}
            slotProps={{
              action: ({ checked }) => ({
                sx: {
                  ...(checked && {
                    bgcolor: 'white',
                    color: '#05A3B2',
                    boxShadow: 'sm',
                    '&:hover': {
                      bgcolor: '#05A3B2',
                    },
                  }),
                  '&:hover': {
                    bgcolor: '#05A3B2',
                    color: "white",
                  }
                },
              }),
            }}
          />
        ))}
      </RadioGroup>
    </Box>
  );
}
