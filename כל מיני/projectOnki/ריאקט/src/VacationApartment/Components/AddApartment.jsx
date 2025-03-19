import { Dialog, DialogContent, DialogContentText, DialogTitle, IconButton } from "@mui/material";
import { InputApartmentDetailes } from "./inputs/InputApartmentDetailes"
import { useNavigate, useOutletContext } from "react-router";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";

export const AddApartment = () => {

    let { setFlag } = useOutletContext()

    const nav = useNavigate()

    const save = (apartment) => {

        axios.post("/apartment", apartment, {
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
                    <InputApartmentDetailes save={(apartment) => save(apartment)} saveText="הוספה"></InputApartmentDetailes>
                </DialogContent>
            </Dialog>
        </>
    )
}