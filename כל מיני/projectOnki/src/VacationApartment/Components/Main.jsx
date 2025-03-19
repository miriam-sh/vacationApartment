import { BrowserRouter } from "react-router-dom"
import { Routing } from "./Routing"
import "../Style/style.css"
import axios from "axios"

export const Main = () => {

    axios.defaults.baseURL="http://localhost:3001/"

    return <>
            <BrowserRouter>
                <Routing></Routing>
            </BrowserRouter>
    </>
}