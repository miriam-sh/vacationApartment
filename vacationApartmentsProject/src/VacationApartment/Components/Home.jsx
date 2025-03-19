import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";


export const Home = () => {

    let [picUrl, setPicUrl] = useState('')
    let [i, setI] = useState(0)

    useEffect(() => {

        let urls = ['a1', 'a2', 'a3', 'a4']

        setPicUrl(urls[0])

        let interval = setInterval(() => {
            setI(prevI => {
                const newI = (prevI + 1) % urls.length
                setPicUrl(urls[newI])
                return newI
            })
        }, 5000);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('homePicturesAnimations')) {
                    entry.target.classList.add('homePicturesAnimations');
                    observer.unobserve(entry.target);
                }
                else
                {
                    entry.target.classList.remove('homePicturesAnimations');
                    entry.target.classList.add('homePicturesRegular');
                }
            });
        });

        document.querySelectorAll('.homePictures').forEach(element => {
            observer.observe(element);
        });


        return () => { clearInterval(interval) }
    }, []);

    return <div className="home">
        <Header></Header>
        <div className="home1">
            <div className="mainTitle">
                <h1>vacation holyday</h1>
                <h3>דירות נופש בטעם שלך</h3>
            </div>

            <img className="img" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/${picUrl}.png`}></img>

            <div className="homePicturesDiv">
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home4.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home2.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home1.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home3.jpg`}></img>
            </div>

            <NavLink className="niceLinkFooter" to={"../apartments"}>{"רוצים לראות עוד? כנסו->"}</NavLink>

            <div className="homePicturesDiv">
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home4.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home2.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home1.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home3.jpg`}></img>
            </div>
            <NavLink className="niceLinkFooter" id="advisterLink" to={"../LoginOrRegister/login"}>{"יש לכם דירת נופש? מוזמנים לפרסם אצלנו ולהנות מקהל לקוחות רחב"}</NavLink>
            <div className="homePicturesDiv">
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home4.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home2.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home1.jpg`}></img>
                <img className="homePictures" src={`${process.env.PUBLIC_URL}/images/apartments/homePictures/home3.jpg`}></img>
            </div>

            <Footer></Footer>
        </div>
    </div>
}