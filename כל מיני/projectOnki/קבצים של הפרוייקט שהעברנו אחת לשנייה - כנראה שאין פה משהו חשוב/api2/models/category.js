import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },

    
    articles: [{
        type: mongoose.Types.ObjectId,
        ref: 'Apartment'
    }]
})

export default mongoose.model('Category', categorySchema)