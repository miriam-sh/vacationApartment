import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'
import ListDetails from './list'


export const Apartment = ({ apartment, loadAgain }) => {

    const nav = useNavigate()

    const deleteApartment = (apartment) => {
        Swal.fire({
            title: "האם אתה בטוח שאתה רוצה למחוק את הדירה?",
            showDenyButton: true,
            confirmButtonText: "אישור",
            denyButtonText: `ביטול`
        }).then((result) => {
            if (result.isConfirmed)
                axios.delete(`/apartment/${apartment._id}`, {
                    headers: { Authorization: "Bearer " + sessionStorage.getItem("advisterToken") }
                })
                    .then(x => {
                        loadAgain(true)
                    })
                    .catch(err => {
                        console.log(err.message);
                    })
        });
    }

    let imageUrl = ""

    if (apartment.image) {
        imageUrl = `data:image/jpeg;base64,${apartment.image.data}`;        
    }

    return (
        <div id="apartment_card">
            <div className='apartmentButtons'>
                <IconButton
                    onClick={() => { deleteApartment(apartment) }}
                    className="roundButton"><DeleteIcon></DeleteIcon>
                </IconButton>
                <IconButton
                    onClick={() => { nav(`updateApartment/${apartment._id}`) }}
                    className="roundButton"><EditIcon></EditIcon>
                </IconButton>
            </div>
            <img width={"300vw"} height={"200vw"} src={imageUrl} alt={apartment.name} />
            <h4>{apartment.name}</h4>
            <label>{apartment.description}</label>
            <ListDetails city={apartment.city.name} beds={apartment.countOfBeds} category={apartment.category.name}></ListDetails>
        </div>
    )
}