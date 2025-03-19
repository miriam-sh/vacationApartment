import { Outlet, useNavigate } from "react-router"
import { Footer } from "./Footer"
import { Header } from "./Header"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { NavLink } from "react-router-dom";
import { useEffect } from "react";


export const LoginOrRegister = () => {

    let nav = useNavigate()


    useEffect(() => {
        if (sessionStorage.getItem("advisterToken") != null)
            nav("../advisterZone")
    }, [])



    return (
        <>
            <div className="loginOrRegister">
                <Header advisterZone={false}></Header>

                <div className="accordions" >
                    <h3>שאלות נפוצות</h3>
                    <Accordion style={{ borderRadius: "15px", marginBottom: "1%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"

                        >
                            <Typography component="span">איך מפרסמים דירה באתר vacation holyday?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            פשוט מאוד! פותחים חשבון באתר ומוסיפים דירה לחשבון
                        </AccordionDetails>
                    </Accordion>


                    <Accordion style={{ borderRadius: "15px", position: "static", marginBottom: "1%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span">איך פותחים חשבון?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            לוחצים על "הרשמה", ממלאים מספר פרטים נחוצים ו-זהו!
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{ borderRadius: "15px", position: "static", marginBottom: "1%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span">כמה עולה הפרסום?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            כרגע, לרגל הפתיחה הפרסום באתר הוא חינמי לחלוטין!
                        </AccordionDetails>
                    </Accordion>

                    <Accordion style={{ borderRadius: "15px", position: "static", marginBottom: "1%" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span">ואיך אנשים ידעו לפנות אלי?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            כאשר נכנסים לדירה, ניתן לראות את הפרטים של המפרסם וכך ניתן ליצור איתך קשר

                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ borderRadius: "15px", position: "static" }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            <Typography component="span">יש לי עוד הרבה שאלות!</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            אין בעיה! אנחנו זמינים כאן בשבילך באימייל vacationHoliday@org.il
                        </AccordionDetails>
                    </Accordion>
                </div>

                <div className="lor">
                    <div className="loginOrRegisterLinks">
                        <NavLink to={"login"} className={"niceLink"}>כניסה</NavLink>
                        <NavLink to={"register"} className={"niceLink"}>הרשמה</NavLink>
                    </div>
                    <Outlet></Outlet>
                </div>

                <Footer></Footer>
            </div>
        </>
    )
}