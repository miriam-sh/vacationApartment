import { Button } from "@mui/material";
import { InputPhone } from "./inputs/InputPhone"
import { InputWithValidate } from "./inputs/InputWithValidate"
import LoginIcon from '@mui/icons-material/Login';
import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate } from "react-router";


export const Register = () => {

    let eMailCOnditions = [
        { func: (value) => !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) && value!="", messege: "מספר אימייל שגוי" }
    ]

    let [eMailErrors , setEmailErrors] = useState()

    let nav = useNavigate()

    const send = (e) => {

        e.preventDefault()


        let advister = {
            name: e.target[0].value != "" ? e.target[0].value : "new user",
            email: e.target[2].value,
            password: e.target[4].value,
            phone: e.target[6].value,
            anotherPhone: e.target[8].value != "" ? e.target[8].value : null
        }

        axios.post(`advister/register`, advister)
            .then(x => {
                sessionStorage.setItem('advisterToken', x.data.token);
                nav("../../advisterZone")
            })
            .catch(error => {
                if (error.response.data.message == "Email already exists.") {
                    setEmailErrors("מספר האימייל כבר קיים במערכת")
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
            <div className="register">
                <form className="form" onSubmit={(e) => send(e)}>
                    <InputWithValidate className="inputTextField" label="הכנס שם משתמש"></InputWithValidate>
                    <InputWithValidate required={true} className="inputTextField" label="הכנס מספר אימייל" conditions={eMailCOnditions} errorMessege={eMailErrors}></InputWithValidate>
                    <InputWithValidate required={true} type="password" className="inputTextField" label="הכנס סיסמא"></InputWithValidate>
                    <InputPhone className="inputTextField" label={"הכנס מספר טלפון"} required={true}></InputPhone>
                    <InputPhone className="inputTextField" label={"הכנס מספר וואטספ"}></InputPhone>
                    <Button startIcon={<LoginIcon></LoginIcon>} className="inputTextField" id="submitInput" type="submit" variant="outlined">רישום</Button>
                </form>
            </div>
        </>
    )
}