import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { InputApartmentDetailes } from "./inputs/InputApartmentDetailes"
import { useNavigate, useOutletContext, useParams } from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";
import { useEffect, useState } from "react";


export const UpdateApartment = () => {

    let { setFlag } = useOutletContext()

    const nav = useNavigate()

    const [apartment, setApartment] = useState()

    const { id } = useParams()

    const save = (apartment) => {

        axios.put(`/apartment/${id}`, apartment, {
            headers: { Authorization: "Bearer " + sessionStorage.getItem("advisterToken") }
        })
            .then(x => {
                setFlag(true)
                nav("../")
            })
            .catch(err => {
                if (err.status == 401) {
                    sessionStorage.removeItem("advisterToken")
                    nav("../../loginOrRegister/login")
                }

                else
                    console.log(err.response.data.message);
            });
    }

    useEffect(() => {
        axios.get(`/apartment/getById/${id}`)
            .then(x => {
                setApartment(x.data);
            })
            .catch(err => { console.log(err.message) })

    }, [])

    return (
        <>
            <Dialog open={true}
                id="DialogAddApartment"
            >
                <DialogTitle id="closeDialog">
                    <IconButton className="roundButton" onClick={() => nav("../")} ><CloseIcon /></IconButton>
                    <DialogContentText id="addApartment">עריכת דירה</DialogContentText>
                </DialogTitle>
                <DialogContent id="DialogAddApartmentContent">
                    {apartment && <InputApartmentDetailes
                        save={(apartment) => save(apartment)}
                        addressDefault={apartment.address}
                        countOfBedsDefault={apartment.countOfBeds}
                        descriptionDefault={apartment.description}
                        nameDefault={apartment.name}
                        pluginsDefault={apartment.plugins}
                        priceDefault={apartment.price}
                        categoryDefault={apartment.category}
                        cityDefault={apartment.city}
                        saveText="שמירה"
                    >
                    </InputApartmentDetailes>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}