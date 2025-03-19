import { Route, Routes } from "react-router"
import { Home } from "./Home"
import { Login } from "./Login"
import { LoginOrRegister } from "./LoginOrRegister"
import { Register } from "./Register"
import { AdvisterZone } from "./AdvisterZone"
import { AddApartment } from "./AddApartment"
import { UpdateApartment } from "./UpdateApartment"
import { Apartments } from "./Apartments"
import { VerifyEmail } from "./VerifyEmail"
export const Routing = () => {

    return <>
        <Routes>
            <Route path="" element={<Home></Home>}></Route>
            <Route path="Home" element={<Home></Home>}></Route>
            <Route path="LoginOrRegister" element={<LoginOrRegister></LoginOrRegister>}>
                <Route path="Login" element={<Login></Login>}>
                    <Route path="verifyEmail/:eMail" element={<VerifyEmail></VerifyEmail>}></Route>
                </Route>
                <Route path="Register" element={<Register></Register>}></Route>
            </Route>
            <Route path="advisterZone" element={<AdvisterZone></AdvisterZone>}>
                <Route path="addApartment" element={<AddApartment></AddApartment>}></Route>
                <Route path="updateApartment/:id" element={<UpdateApartment></UpdateApartment>}></Route>
            </Route>
            <Route path="apartments" element={<Apartments></Apartments>}></Route>
        </Routes>
    </>
}