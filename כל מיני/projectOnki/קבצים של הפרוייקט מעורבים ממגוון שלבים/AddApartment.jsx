import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { InputApartmentDetailes } from "./inputs/InputApartmentDetailes"
import { useNavigate, useOutletContext } from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


export const AddApartment = () => {
    
    const nav = useNavigate()

    const save = (apartment) => {
        console.log(apartment);
        axios.post("/apartment", apartment,
            {
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("advisterToken")
                }
            }
        )
            .then(x => {
                nav("../")
            })
            .catch(err => {
            });
    }

    return (
        <>
            <Dialog open={true}
                id="DialogAddApartment"
            >
                <DialogTitle id="closeDialog">
                    <IconButton className="roundButton" onClick={() => nav("../")} ><CloseIcon /></IconButton>
                    <DialogContentText id="addApartment">הוספת דירה</DialogContentText>
                </DialogTitle>
                <DialogContent id="DialogAddApartmentContent">
                    <InputApartmentDetailes save={(apartment) => save(apartment)}></InputApartmentDetailes>
                </DialogContent>
            </Dialog>
        </>
    )
}