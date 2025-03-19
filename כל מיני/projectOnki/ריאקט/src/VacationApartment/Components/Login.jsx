import { Button } from "@mui/material";
import { InputWithValidate } from "./inputs/InputWithValidate"
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import { useState } from "react";


export const Login = () => {


    let eMailCOnditions = [
        { func: (value) => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) && value!="", messege: "מספר אימייל שגוי" }
    ]

    let [eMailErrors, setEmailErrors] = useState()
    const [passwordM, setPasswordM] = useState()

    let nav = useNavigate()

    const send = (e) => {
        e.preventDefault()

        let advister = {
            email: e.target[0].value,
            password: e.target[2].value
        }

        axios.post(`advister/login`, advister)
            .then(x => {
                sessionStorage.setItem('advisterToken', x.data.token);
                nav("../../advisterZone")
            })
            .catch(error => {
                if (error.status == 401) {
                    if (error.response.data.message == "Authentication failed")
                        setEmailErrors("משתמש לא נמצא")
                    else
                        setPasswordM("הסיסמא שגויה")
                }
                else {
                    Swal.fire({
                        icon: "error",
                        text: "חלה שגיאה בעדכון הנתונים, אנא דווחו למנהל המערכת",
                        showConfirmButton: false,
                        timer: 2000
                    })
                }
            })

    }

    return (
        <>
            <div className="login">
                <form className="form" onSubmit={(e) => send(e)}>
                    <InputWithValidate required={true} className="inputTextField" label="הכנס מספר אימייל" conditions={eMailCOnditions} errorMessege={eMailErrors}></InputWithValidate>
                    <InputWithValidate required={true} type="password" className="inputTextField" label="הכנס סיסמא" errorMessege={passwordM}></InputWithValidate>
                    <Button startIcon={<LoginIcon></LoginIcon>} className="inputTextField" id="submitInput" type="submit" variant="outlined">כניסה</Button>
                </form>
            </div>
        </>
    )
}