import { TextField } from "@mui/material"
import { useState } from "react"

export const InputWithValidate = ({ conditions = [], className = "", type = "text", id = "", label = "", errorMessege = "", required = false, onBlur = (e) => { }, value=null }) => {

    const [error, setError] = useState()
    const check = (e) => {
        let i
        for (i = 0; i < conditions.length && !conditions[i].func(e.target.value); i++);

        if (i == conditions.length)
            setError("")
        
        else {
            setError(conditions[i].messege)
            e.target.focus()
        }

    }

    return <TextField style={{direction: "rtl"}} inputProps={{style: {textAlign: 'right'}, dir: 'rtl'}}  type={type} className={className} id={id} label={label} variant="outlined" error={(error != null && error != "") || (errorMessege != null && errorMessege != "")} onBlur={(e) => { check(e); onBlur(e) }} helperText={error || errorMessege} required={required} defaultValue={value} />

}
