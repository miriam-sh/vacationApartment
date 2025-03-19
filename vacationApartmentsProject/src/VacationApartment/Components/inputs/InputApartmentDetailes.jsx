import { Button, IconButton, Table, TableCell, TableRow, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import AddBoxIcon from '@mui/icons-material/AddBox';
import axios from "axios";
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import DeleteIcon from '@mui/icons-material/Delete'
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Swal from "sweetalert2";

const filter = createFilterOptions();

export const InputApartmentDetailes = ({
    save = (apartment) => { console.log(apartment); },
    nameDefault = null,
    descriptionDefault = null,
    categoryDefault = null,
    imageDefault = null,
    cityDefault = null,
    addressDefault = null,
    countOfBedsDefault = null,
    priceDefault = null,
    pluginsDefault = [],
    saveText = "אישור"
}) => {

    const [plugins, setPlugins] = useState(pluginsDefault)

    const [openPlugin, setOpenPlugin] = useState(false)

    const [newPlugin, setNewPlugin] = useState("")

    let [categories, setCategories] = useState([])

    let [cities, setCities] = useState([])

    const [city, setCity] = useState(cityDefault);

    const saveNewCity = (newValue) => {
        let newCity = { name: newValue, _id: -1 }
        setCities([...cities, newCity])
        setCity(newCity);
    }

    const [category, setCategory] = useState(categoryDefault);

    const saveNewCategory = (newValue) => {
        let newCategory = { name: newValue, _id: -1 }
        setCategories([...categories, newCategory])
        setCategory(newCategory);
    }

    useEffect(() => {
        axios.get("/city")
            .then((x) => {
                setCities(x.data)
            })
            .catch((err) => {
                console.log(err.message);
            })

        axios.get("/category")
            .then((x) => {
                setCategories(x.data)
            })
            .catch((err) => {
                console.log(err.message);
            })

    }, [])

    return (
        <>
            <form id="inputApartmentDetailes" className="form" onSubmit={async (e) => {

                e.preventDefault()

                if (!category || !city) {
                    Swal.fire({
                        title: !category ? "הכנס קטגוריה" : "הכנס עיר",
                        icon: "error",
                        timer: 700,
                        showConfirmButton: false
                    })
                    return
                }

                let apartment = {
                    name: e.target[0].value != "" ? e.target[0].value : null,
                    description: e.target[2].value,
                    category: category._id,
                    city: city._id,
                    address: e.target[12].value,
                    countOfBeds: e.target[14].value,
                    price: e.target[16].value,
                    plugins: plugins,
                };

                if (apartment.category == -1) {
                    const response = await axios.post("/category", { name: category.name });
                    apartment.category = response.data._id;
                }

                if (apartment.city == -1) {
                    const response = await axios.post("/city", { name: city.name });
                    apartment.city = response.data._id;
                }


                console.log(e.target[4].files[0])

                const formData = new FormData();
                formData.append('apartment', JSON.stringify(apartment));
                formData.append('image', e.target[4].files[0] ? e.target[4].files[0] : null);

                save(formData);

            }}>
                <TextField className="inputTextField" label="שם" variant="outlined" defaultValue={nameDefault}></TextField>
                <TextField className="inputTextField" required label="תיאור" variant="outlined" defaultValue={descriptionDefault}></TextField>
                <TextField type="file" className="inputTextField" required={!imageDefault} label="תמונה" variant="outlined"></TextField>
                <Autocomplete
                    value={category}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setTimeout(() => {
                                saveNewCategory(newValue.inputValue)
                            });
                        } else if (newValue && newValue.inputValue) {
                            saveNewCategory(newValue.inputValue)
                        } else {
                            setCategory(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: `הוספת ${params.inputValue} לרשימה`,
                            });
                        }

                        return filtered;
                    }}
                    id="free-solo-dialog-demo1"
                    options={categories}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                {option.name}
                            </li>
                        );
                    }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="קטגוריה *" />}
                    className="inputTextField"
                ></Autocomplete>
                <Autocomplete
                    value={city}
                    onChange={(event, newValue) => {
                        if (typeof newValue === 'string') {
                            setTimeout(() => {
                                saveNewCity(newValue.inputValue)
                            });
                        } else if (newValue && newValue.inputValue) {
                            saveNewCity(newValue.inputValue)
                        } else {
                            setCity(newValue);
                        }
                    }}
                    filterOptions={(options, params) => {
                        const filtered = filter(options, params);

                        if (params.inputValue !== '') {
                            filtered.push({
                                inputValue: params.inputValue,
                                name: `הוספת ${params.inputValue} לרשימה`,
                            });
                        }

                        return filtered;
                    }}
                    id="free-solo-dialog-demo2"
                    options={cities}
                    getOptionLabel={(option) => {
                        if (typeof option === 'string') {
                            return option;
                        }
                        if (option.inputValue) {
                            return option.inputValue;
                        }
                        return option.name;
                    }}
                    selectOnFocus
                    clearOnBlur
                    handleHomeEndKeys
                    renderOption={(props, option) => {
                        const { key, ...optionProps } = props;
                        return (
                            <li key={key} {...optionProps}>
                                {option.name}
                            </li>
                        );
                    }}
                    freeSolo
                    renderInput={(params) => <TextField {...params} label="עיר *" />}
                    className="inputTextField"
                ></Autocomplete>
                <TextField className="inputTextField" required label="כתובת" variant="outlined" defaultValue={addressDefault}></TextField>
                <TextField className="inputTextField" required type="number" label="מספר מיטות" variant="outlined" defaultValue={countOfBedsDefault}></TextField>
                <TextField className="inputTextField" required type="number" label="מחיר" variant="outlined" defaultValue={priceDefault}></TextField>
                <p id="pluginTitle">תוספים</p>
                {(plugins.length > 0 || openPlugin) ?
                    <Table>
                        <tbody>
                            {plugins.map((p, i) =>
                                <TableRow key={i}>
                                    <TableCell>{p}</TableCell>
                                    <TableCell>
                                        <IconButton
                                            onClick={() => { setPlugins(prevPlugins => prevPlugins.filter((p, j) => j != i)) }}
                                            className="roundButton"><DeleteIcon></DeleteIcon>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )}
                            {openPlugin &&
                                <TableRow>
                                    <TableCell>
                                        <TextField variant="outlined" onChange={e => setNewPlugin(e.target.value)}></TextField>
                                    </TableCell>
                                    <TableCell>
                                        {newPlugin != "" ?
                                            <IconButton onClick={() => {
                                                setPlugins([...plugins, newPlugin])
                                                setNewPlugin("")
                                                setOpenPlugin(false)
                                            }} className="roundButton"><CheckIcon></CheckIcon></IconButton>
                                            : <IconButton onClick={() => {
                                                setOpenPlugin(false)
                                            }} className="roundButton"><CloseIcon></CloseIcon></IconButton>
                                        }
                                    </TableCell>
                                </TableRow>}
                        </tbody>
                    </Table>
                    :
                    <p id="noPlugins">-אין תוספים-</p>
                }
                <Button startIcon={<AddBoxIcon></AddBoxIcon>} onClick={() => setOpenPlugin(true)} className="inputTextField" id="addPlugin">הוספת תוסף</Button>
                <Button className="inputTextField" id="submitInput" type="submit" variant="outlined">{saveText}</Button>
            </form>
        </>
    )
}