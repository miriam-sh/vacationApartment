import mongoose from "mongoose";

const citySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    apartments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Apartment"
    }]
});

export default mongoose.model("City", citySchema);