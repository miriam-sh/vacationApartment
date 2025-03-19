import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import { IconButton } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router'
import Swal from 'sweetalert2'


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

    return (
        <div className='apartment'>
            <h5>{apartment.name}</h5>
            <h5>{apartment.description}</h5>
            <h5>{apartment.address}</h5>
            <h5>{apartment.countOfBeds}</h5>
            <h5>{apartment.price}</h5>
            <h5>{apartment.category.name}</h5>
            <h5>{apartment.city.name}</h5>
            {
                apartment.plugins.map((p, i) => <h6 key={i}>{p}</h6>)
            }

            <IconButton
                onClick={() => { deleteApartment(apartment) }}
                className="roundButton"><DeleteIcon></DeleteIcon>
            </IconButton>
            <IconButton
                onClick={() => { nav(`updateApartment/${apartment._id}`) }}
                className="roundButton"><EditIcon></EditIcon>
            </IconButton>
        </div>
    )
}