import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from "react-router";
import { InputWithValidate } from "./inputs/InputWithValidate";
import Swal from "sweetalert2";
import axios from "axios";

export const LoginWithNewPassword = () => {

    const nav = useNavigate()

    const { eMail } = useParams()

    const send = (e) => {
        e.preventDefault()

        let advister = {
            email: e.target[0].value,
            password: e.target[2].value
        }        

        axios.post(`advertiser/loginWithNewPassword`, advister)
            .then(x => {
                sessionStorage.setItem('advisterToken', x.data.token);
                nav("../../../advisterZone")
            })
            .catch(error => {
                console.log(error.messege);
                Swal.fire({
                    icon: "error",
                    text: "חלה שגיאה בעדכון הנתונים, אנא דווחו למנהל המערכת",
                    showConfirmButton: false,
                    timer: 2000
                })
            })

    }

    return (
        <>
            <Dialog open={true}
                id="DialogLoginWithNewPassword"
            >
                <DialogTitle id="closeDialog">
                    <IconButton className="roundButton" onClick={() => nav("../")} ><CloseIcon /></IconButton>
                    <DialogContentText id="LoginWithNewPassword">כניסה באמצעות סיסמא חדשה</DialogContentText>
                </DialogTitle>
                <DialogContent id="DialogLoginWithNewPasswordContent">
                    <div className="login">
                        <form className="form" onSubmit={(e) => send(e)}>
                            <TextField id="advisterEmail"className="inputTextField" label="הכנס מספר אימייל" defaultValue={eMail} disabled></TextField>
                            <InputWithValidate required={true} type="password" className="inputTextField" label="הכנס סיסמא חדשה"></InputWithValidate>
                            <Button startIcon={<LoginIcon></LoginIcon>} className="inputTextField" id="submitInput" type="submit" variant="outlined">כניסה</Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}