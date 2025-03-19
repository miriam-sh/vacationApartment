import { Button, Dialog, DialogContent, DialogContentText, DialogTitle, IconButton, TextField } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";


export const VerifyEmail = () => {


    const { eMail } = useParams()

    let [code, setCode] = useState()

    const nav = useNavigate()

    if (document.getElementById("vei1"))
        document.getElementById("vei1").focus()

    useEffect(() => {

        if (eMail == "null") {
            nav("../")
        }

        if (sessionStorage.getItem("firstRunning") == "false") {
            sessionStorage.removeItem("firstRunning")
            axios.get(`advertiser/verifyEmail/${eMail}`)
                .then(x => {
                    setCode(x.data.code)
                }
                )
                .catch(error => {
                    console.log(error.messege);
                })
        }
        else
            sessionStorage.setItem("firstRunning","false")

    }, [])

    return (
        <>
            <Dialog open={true}
                id="DialogVerifyEmail"
            >
                <DialogTitle id="closeDialog">
                    <IconButton className="roundButton" onClick={() => nav("../")} ><CloseIcon /></IconButton>
                    <DialogContentText id="VerifyEmail">ברגעים אלו נשלח לכתובת האימייל שלך קוד, אנא הקש אותו כאן</DialogContentText>
                </DialogTitle>
                <DialogContent id="DialogVerifyEmailContent">
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        let inputCode = e.target[0].value + e.target[1].value + e.target[2].value + e.target[3].value + e.target[4].value + e.target[5].value
                        if (inputCode == code) {
                            Swal.fire({
                                icon: "success",
                                text: "חשבון האימייל אומת",
                                showConfirmButton: false,
                                timer: 2000
                            })
                            nav(`/loginOrRegister/login/loginWithNewPassword/${eMail}`)
                        } else {
                            Swal.fire({
                                icon: "error",
                                text: "הסיסמא אינה נכונה",
                                showConfirmButton: false,
                                timer: 2000
                            })
                            e.target.reset()
                        }
                    }}>
                        <div id="verifyEmailInputsDiv">
                            <TextField variant="standard" margin="normal" className="verifyEmailInputs" id="vei1" onInput={() => document.getElementById("vei2").focus()}></TextField>
                            <TextField variant="standard" margin="normal" className="verifyEmailInputs" id="vei2" onInput={() => document.getElementById("vei3").focus()}></TextField>
                            <TextField variant="standard" margin="normal" className="verifyEmailInputs" id="vei3" onInput={() => document.getElementById("vei4").focus()}></TextField>
                            <TextField variant="standard" margin="normal" className="verifyEmailInputs" id="vei4" onInput={() => document.getElementById("vei5").focus()}></TextField>
                            <TextField variant="standard" margin="normal" className="verifyEmailInputs" id="vei5" onInput={() => document.getElementById("vei6").focus()}></TextField>
                            <TextField variant="standard" margin="normal" className="verifyEmailInputs" id="vei6" onInput={() => document.getElementById("vei6").blur()}></TextField>
                        </div>
                        <Button className="inputTextField" id="submitInput" type="submit" variant="outlined">אישור</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}