
import mongoose from "mongoose";

const apartmentSchema = mongoose.Schema({

    name: String,
    description: String,
    imgUrl: String,
    
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

    advertiser: {
        type: mongoose.Types.ObjectId,
        ref: 'Advertiser'
    },

})

export default mongoose.model('Apartment', apartmentSchema)