
import mongoose from "mongoose";

const apartmentSchema = mongoose.Schema({

    name: String,
    description: String,    
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    
    city: {
        type: mongoose.Types.ObjectId,
        ref: 'City'
    },

    address: String,
    countOfBeds: Number,
    price: Number,
    plugins:[String],
    image:{
        type:mongoose.Types.ObjectId,
        ref: 'Image'
    },
    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser'
    },

})

export default mongoose.model('Apartment', apartmentSchema)