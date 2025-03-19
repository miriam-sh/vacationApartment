import { Outlet, useNavigate } from "react-router"
import { Footer } from "./Footer"
import { Header } from "./Header"
import { useEffect, useState } from "react"
import axios from "axios"
import { Apartment } from "./Apartment"
import { Button } from "@mui/material"


export const AdvisterZone = () => {

    let nav = useNavigate()

    if (sessionStorage.getItem("advisterToken") == null)
        nav("../home")

    const [apartments, setApartments] = useState([])

    const [flag, setFlag] = useState(false)

    useEffect(() => {
        setFlag(false)
        axios.get(`/apartment/advertiser`, {
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("advisterToken")
            }
        })
            .then((x) => {
                setApartments(x.data)
            })
            .catch((err) => {
                if (err.status == 401) {
                    sessionStorage.removeItem("advisterToken")
                    nav("../loginOrRegister/login")
                }

                else
                    console.log(err.response.data.message);
            })
    }, [flag])

    return (
        <>
            <Header advisterZone={false}></Header>
            <div style={{ minHeight: "122px" }}>
                {apartments.map((a, i) => <Apartment apartment={a} key={i} loadAgain={setFlag}></Apartment>)}
            </div>
            <Button id="apartmentButton" onClick={() => nav("addApartment")}>להוספת דירה</Button>
            <Outlet context={{ setFlag }}></Outlet>
            <Footer></Footer>
        </>
    )
}