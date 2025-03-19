import { Footer } from "./Footer"
import { Header } from "./Header"
import { useEffect, useState } from "react"
import { getAll, filter, minMaxBeds, minMaxPrice } from "../data/getapartments";
import { CardApartment } from "./card_apartment";
import { getCities, getWeather } from "../data/gets";
import { getCategories } from "../data/gets";
import ToFilter from "./filter";
import RangeSlider from "./slider";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import FilterAltOffIcon from '@mui/icons-material/FilterAltOff';
import AttachMoney from '@mui/icons-material/AttachMoney';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalHotel } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { Avatar, Button, IconButton, ListItem, ListItemAvatar, ListItemText } from "@mui/material";


export const Apartments = () => {

    const [apartments, setApartments] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [maxPrice, setMaxPrice] = useState()
    const [minPrice, setMinPrice] = useState();
    const [minBeds, setMinBeds] = useState();
    const [maxBeds, setMaxBeds] = useState();
    const [filterBy, setFilterBy] = useState({});
    const [showFilter, setShowFilter] = useState();

    const [filterState, setFilterState] = useState(false)

    const findApartments = () => {

        filter(filterBy).then((res) => {
            setApartments(res.data)
        }
        ).catch((err) =>
            console.log(err)
        )
    }

    const getAllApartments = () => {
        getAll().then((response) => {
            setApartments(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    useEffect(() => {
        getAllApartments()

        getCities().then((response) => {
            setCities(response.data)
        }).catch((error) => {
            console.log(error)
        })

        getCategories().then((response) => {
            setCategories(response.data)
        }).catch((error) => {
            console.log(error)
        })
        minMaxBeds().then((response) => {
            setMaxBeds(response.data.maxBeds)
            setMinBeds(response.data.minBeds)
        }).catch((error) => {
            console.log(error)
        })

        minMaxPrice().then((response) => {
            setMaxPrice(response.data.maxPrice)
            setMinPrice(response.data.minPrice)
        }).catch((error) => {
            console.log(error)
        })

        getWeather("חיפה").then((response) => {

            console.log(response.data)
            setShowFilter(response.data.id)
        }).catch((error) => {
            console.log(error)
        })

    }, []);

    return (<>

        <div className="apartmentsNav">
            <Header apartments={false} ></Header>
        </div>

        <h1>{showFilter}</h1>
        <div style={{ textAlign: "center" }}>
            {filterState == false ?
                <Button startIcon={<FilterAltIcon></FilterAltIcon>} style={{ marginBottom: "2%", color: "#047F9A", fontSize: "medium" }} onClick={() => setFilterState(true)}>סינון</Button>
                :
                <>
                    <Button startIcon={<FilterAltOffIcon></FilterAltOffIcon>} style={{ marginBottom: "2%", color: "#047F9A", fontSize: "medium" }} onClick={() => { setFilterState(false); getAllApartments() }}>ביטול הסינון</Button>
                    <div className="filters">
                        <div>
                            <label className="filtersLable">מחיר</label>
                            {/* <AttachMoney sx={{ color: '#047F9A' }}></AttachMoney> */}
                            <FaSackDollar style={{color:"#047F9A"}}></FaSackDollar>
                            <RangeSlider
                                min={minPrice}
                                max={maxPrice}
                                find={findApartments}
                                filter="price"
                                setFilterBy={setFilterBy}
                                filterBy={filterBy}
                            ></RangeSlider>
                        </div>
                        <div>
                            <label className="filtersLable">מספר מיטות</label>
                            {/* <HotelIcon sx={{ color: '#047F9A' }} /> */}
                            <MdLocalHotel style={{color:"#047F9A"}}/>
                            <RangeSlider
                                min={minBeds}
                                max={maxBeds}
                                find={findApartments}
                                filter="beds"
                                setFilterBy={setFilterBy}
                                filterBy={filterBy}
                            ></RangeSlider>
                        </div>
                        <div>
                            <label className="filtersLable">עיר</label>
                            {/* <LocationOnIcon sx={{ color: '#047F9A' }}></LocationOnIcon> */}
                            <FaLocationDot style={{color:"#047F9A"}} />
                            <ToFilter val={filter.city} find={findApartments} filter={"city"} list={cities} filterBy={filterBy} setFiterBy={setFilterBy} ></ToFilter>
                        </div>
                        <div>
                            <label className="filtersLable">קטגוריה</label>
                            {/* <HomeIcon sx={{ color: '#047F9A' }}></HomeIcon> */}
                            <IoHome style={{color:"#047F9A"}}/>
                            <ToFilter val={filter.category} find={findApartments} filter={"category"} list={categories} filterBy={filterBy} setFiterBy={setFilterBy}></ToFilter>
                        </div>
                    </div>
                </>
            }
        </div>
        <br />
        <div id="cards">
            {apartments && apartments.map((apartment) =>
                <CardApartment apartment={apartment}></CardApartment>
            )
            }</div>

        <Footer></Footer>

    </>)
}