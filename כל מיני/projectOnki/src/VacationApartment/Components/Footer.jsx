import { OurNewsLetter } from "./OurNewsLetter"


export const Footer = () => {
    return (
        <div className="footerDiv">
            <img className="img" src={`${process.env.PUBLIC_URL}/images/apartments/niceFooter.png`}></img>
            <div className="overPart">
                <p className="overText">
                    פה יהיה כתוב כל מיני דברים בשבח האתר שלנו
                    כמה שהוא יפה, מושלם ומהמם
                    ועוד ועוד כל מיני דברים מעניינים (או שכן או שלא)
                    נראה אח"כ מה לכתוב פה
                    פה יהיה כתוב כל מיני דברים בשבח האתר שלנו
                    כמה שהוא יפה, מושלם ומהמם
                    ועוד ועוד כל מיני דברים מעניינים (או שכן או שלא)
                    נראה אח"כ מה לכתוב פה
                    פה יהיה כתוב כל מיני דברים בשבח האתר שלנו
                    כמה שהוא יפה, מושלם ומהמם
                    ועוד ועוד כל מיני דברים מעניינים (או שכן או שלא)
                    נראה אח"כ מה לכתוב פה
                </p>
                <OurNewsLetter></OurNewsLetter>
            </div>
        </div>
    )
}