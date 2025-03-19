import { BrowserRouter } from "react-router-dom"
import { Routing } from "./Routing"
import "../Style/style.css"
import axios from "axios"

export const Main = () => {

    axios.defaults.baseURL=process.env.REACT_APP_SERVER_CONNECTION

    return <>
            <BrowserRouter>
                <Routing></Routing>
            </BrowserRouter>
    </>
}
