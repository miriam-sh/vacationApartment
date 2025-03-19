import { useRef } from "react"
import { NavLink, useNavigate } from "react-router-dom"


export const Header = ({ apartments = true, advisterZone = true }) => {

    let nav = useNavigate()

    const logOut = () => {
        sessionStorage.removeItem("advisterToken")
    }

    let logout = sessionStorage.getItem("advisterToken") != null && !advisterZone

    return (
        <div className={!logout && (!apartments || !advisterZone) ? "oneLink" : "twoLink"}>
            <nav className="homeNav">
                <img className="logo" src={`${process.env.PUBLIC_URL}/images/apartments/logo.gif`} onClick={() => { nav("../home") }}></img>
                <div className="links">
                    <NavLink hidden={!apartments} className="niceLink" to={"../apartments"}>לצפייה בקטלוג הדירות</NavLink>
                    <NavLink hidden={!advisterZone} className="niceLink" to={"../LoginOrRegister/Login"}>לאזור אישי</NavLink>
                    <NavLink hidden={!logout} className="niceLink" onClick={() => { logOut() }}>להתנתקות</NavLink>
                </div>
            </nav>
        </div>
    )

}