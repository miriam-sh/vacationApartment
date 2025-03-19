import mongoose from'mongoose';

const advertiserSchema = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    phon:{
        type: String,
        required: true,

    },
    anotherPhone:{
        type: String,
        required: false
    },
    apartments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    }]
});

export default mongoose.model('Advertiser', advertiserSchema);