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
import { FaSackDollar } from "react-icons/fa6";
import { FaLocationDot } from "react-icons/fa6";
import { MdLocalHotel } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { Button } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export const Apartments = () => {

    const [apartments, setApartments] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])
    const [maxPrice, setMaxPrice] = useState()
    const [minPrice, setMinPrice] = useState();
    const [minBeds, setMinBeds] = useState();
    const [maxBeds, setMaxBeds] = useState();
    const [filterBy, setFilterBy] = useState({});
    const [filterOpen, setFilterOpen] = useState(false)

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

    }, []);

    return (<>

        <div className="apartmentsNav">
            <Header apartments={false} ></Header>
        </div>

        {filterOpen == false &&
            <div id="openFilters">
                <Button startIcon={<SearchIcon></SearchIcon>} sx={{bgcolor:"#047F9A",color:"white"}} style={{fontSize: "medium" }} onClick={() => setFilterOpen(true)}>חפשו לי דירה  </Button>
                {/* <Button variant="contained" endIcon={<SendIcon />}>
  Send
</Button> */}
            </div >
        }
        <br />
        <div style={{ display: "flex", justifyContent: "space-around" }}>
            {filterOpen == true &&
                <>
                    <div style={{ textAlign: "center" }}>
                        <Button startIcon={<SearchIcon></SearchIcon>}  sx={{bgcolor:"#047F9A",color:"white"}} style={{ marginBottom: "2%", fontSize: "medium", marginRight: "12%" }} onClick={() => { setFilterOpen(false); getAllApartments() }}>ביטול הסינון</Button>
                        <div className="filters">
                            <div>
                                <label className="filtersLable">מחיר</label>
                                <FaSackDollar style={{ color: "#047F9A" }}></FaSackDollar>
                                <RangeSlider
                                    min={minPrice}
                                    max={maxPrice}
                                    find={findApartments}
                                    filter="price"
                                    setFilterBy={setFilterBy}
                                    filterBy={filterBy}
                                ></RangeSlider>
                            </div>
                            <br></br>
                            <div>
                                <label className="filtersLable">מספר מיטות</label>
                                <MdLocalHotel style={{ color: "#047F9A" }} />
                                <RangeSlider
                                    min={minBeds}
                                    max={maxBeds}
                                    find={findApartments}
                                    filter="beds"
                                    setFilterBy={setFilterBy}
                                    filterBy={filterBy}
                                ></RangeSlider>
                            </div>
                            <br></br>
                            <div style={{ display: "flex", justifyContent: "space-around" }}>
                                <div>
                                    <label className="filtersLable">עיר</label>
                                    <FaLocationDot style={{ color: "#047F9A" }} />
                                    <ToFilter val={filter.city} find={findApartments} filter={"city"} list={cities} filterBy={filterBy} setFiterBy={setFilterBy} ></ToFilter>
                                </div>
                                <div>
                                    <label className="filtersLable">קטגוריה</label>
                                    <IoHome style={{ color: "#047F9A" }} />
                                    <ToFilter val={filter.category} find={findApartments} filter={"category"} list={categories} filterBy={filterBy} setFiterBy={setFilterBy}></ToFilter>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            }
            <div id="cards" style={filterOpen ? { margin: "4%", width:"110%" } : {}}>
                {apartments && apartments.map((apartment) =>
                    <CardApartment apartment={apartment}></CardApartment>
                )
                }</div>
        </div>

        <Footer></Footer>

    </>)
}