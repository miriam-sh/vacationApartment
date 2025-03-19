import { Footer } from "./Footer"
import { Header } from "./Header"
import { useEffect, useState } from "react"
import { getAll, getByCity, getByCategory, getByCount, filter, minMaxBeds, minMaxPrice } from "../data/getapartments";
import { CardApartment } from "./card_apartment";
import { getCities, getWeather } from "../data/gets";
import { getCategories } from "../data/gets";
import ToFilter from "./filter";
import RangeSlider from "./slider";
import SelectBy from "./select";
import InputSlider from "./slider";
import LabelBottomNavigation from "./filterby";
import HomeIcon from '@mui/icons-material/Home';
import HotelIcon from '@mui/icons-material/Hotel';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import FilterByH from "./filterhidden";

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

    const findApartments = () =>
    {
        console.log(filterBy);  
        filter(filterBy).then((res)=>
        {
            setApartments(res.data)
            console.log(res.data);
            
        }
        ).catch((err) =>
            console.log(err)
        )
    }

    useEffect(() => { 
        getAll().then((response) => {
            setApartments(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

        getCities().then((response) => {
            setCities(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })

        getCategories().then((response) => {
            setCategories(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
        minMaxBeds().then((response) => {
            setMaxBeds(response.data.maxBeds)
            setMinBeds(response.data.minBeds)
            console.log(response.data)
        }).catch((error) => {   
            console.log(error)
        })

        minMaxPrice().then((response) => {
            setMaxPrice(response.data.maxPrice)
            setMinPrice(response.data.minPrice)
            console.log(response.data)
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
        {/* <div className="filters"><ToFilter
            list={listFilters}
            setApartments={setFilterBy}
            filter={filterBy}
            getAllApartments={getAllApartments}
        ></ToFilter></div> */}
<h1>{showFilter}</h1>
        <div className="filters">
                <div>
                    {/* <SelectBy filter={filterByPrice} count={price} compare={compareB} setCompare={setCompareB}></SelectBy>
                    <br /> */}
                    <RangeSlider
                        min={minPrice}
                        max={maxPrice}
                        find={findApartments}
                        filter = "price"
                        setFilterBy={setFilterBy}
                        filterBy={filterBy}
                    ></RangeSlider>
                </div>
                 <div>
                {/* <SelectBy filter={filterByCountBeds} count={beds} compare={compareP} setCompare={setCompareP}></SelectBy>
                <br /> */}
                <RangeSlider
                    min={minBeds}
                    max={maxBeds}
                    find={findApartments}
                    filter = "beds"
                    setFilterBy={setFilterBy}
                    filterBy={filterBy}     
                ></RangeSlider>
            </div>
    <ToFilter val = {filter.city} find={findApartments} filter={"city"} list={cities} filterBy={filterBy} setFiterBy={setFilterBy} ></ToFilter>
      <ToFilter val = {filter.category} find={findApartments} filter={"category"} list={categories} filterBy={filterBy} setFiterBy={setFilterBy}></ToFilter>
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