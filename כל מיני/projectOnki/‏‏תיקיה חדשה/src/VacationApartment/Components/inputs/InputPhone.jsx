import { InputWithValidate } from "./InputWithValidate"

export const InputPhone = ({ className, id, label,errorMessege, onBlur = (e) => { } , required=false }) => {

    const phoneCondotions = [
        { func: (value) => !(/^([0]\d{1,3}[-])?\d{7,10}$/.test(value) || value==""), messege: "טלפון שגוי" }
    ]

    return <InputWithValidate className={className} conditions={phoneCondotions} id={id} label={label} errorMessege={errorMessege} onBlur={onBlur} required={required}></InputWithValidate>
}