import { useEffect, useState } from "react"
import { getAll, getByCity,getByCategory,getByCount } from "../data/getapartments";
import { CardApartment } from "./card_apartment";
import { getCities } from "../data/gets";
import { getCategories } from "../data/gets";
import ToFilter from "./filter";
import SelectBy from "./select";
import InputSlider from "./slider";
import  './style.css'
export const Apartments = () => {

    const [apartments, setApartments] = useState([])
    const [cities, setCities] = useState([])
    const [categories, setCategories] = useState([])

    const [compareP, setCompareP] = useState('Bigger');
    const [compareB, setCompareB] = useState('Bigger');
    const [price, setPrice] = useState(500);
    const [beds, setBeds] = useState(3);

    const [filterBy, setFilterBy] = useState(-1);

   const listFilters =[
        {_id:1,
        name:"עיר"},
        {_id:2,
        name:"קטגוריה"},
        {_id:3,
        name:"מספר מיטות"},
        {_id:4,
        name:"מחיר"},
        ]

    const getAllApartments=()=>{
        getAll().then((response) => {
            setApartments(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const filterByCity = (city) => {
        if(city==-1)
         return getAllApartments()
        getByCity(city).then((response) => {
            setApartments(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const filterByCategory = (category) => {
        if(category==-1)
            return getAllApartments()
        getByCategory(category).then((response) => {
            setApartments(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const filterByCountBeds = (count, compare) => {
        getByCount(count,"getByCountOfBeds"+ compare).then((response) => {
            setApartments(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    const filterByPrice = (count, compare) => {
        getByCount(count,"getByPrice"+ compare).then((response) => {
            setApartments(response.data)
            console.log(response.data)
        }).catch((error) => {
            console.log(error)
        })
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
    }, []);

/*        {_id:1,
name:"עיר"},
{_id:2,
name:"קטגוריה"},
{_id:3,
name:"מספר מיטות"},
{_id:4,
name:"מחיר"},
]*/
    return <>
    <div className="filters"><ToFilter
     list={listFilters} 
     setApartments={setFilterBy} 
     filter = {filterBy}
     getAllApartments ={getAllApartments}
    
     ></ToFilter></div>
    
    <div className="filters">
            { filterBy == 4 &&
                 <div>
                <SelectBy filter={filterByPrice} count={price} compare={compareB} setCompare={setCompareB}></SelectBy>
                <br/>
                <InputSlider 
                filter = {filterByPrice} 
                compare ={compareB} 
                value ={price} 
                setValue ={setPrice}
                min ={100}
                max ={10000}
                ></InputSlider>
                </div>} 
                {filterBy == 3 && <div>
                <SelectBy filter={filterByCountBeds} count={beds} compare={compareP} setCompare={setCompareP}></SelectBy>
                <br/>
                <InputSlider
                filter = {filterByCountBeds}
                compare ={compareP}
                value ={beds} 
                setValue ={setBeds}
                min ={2}
                max ={20}
                ></InputSlider>
                </div>} 
            {filterBy == 1 && <ToFilter list={cities} setApartments={filterByCity} getAllApartments={getAllApartments}></ToFilter>}
               { filterBy == 2 && <ToFilter list={categories} setApartments={filterByCategory} getAllApartments={getAllApartments}></ToFilter>}
               </div>
               <br/>
        <div id="cards">
        { apartments && apartments.map((apartment) =>
            <CardApartment apartment={apartment}></CardApartment>
        )
        }</div>
    </>
}
