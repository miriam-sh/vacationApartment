import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    
    apartments: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'

 
    }]
})

export default mongoose.model('Category', categorySchema)