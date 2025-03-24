import mongoose from "mongoose";

const CoworkingSpaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    tel: {
        type: String,
        required:[true,'Please Add a telephone number']
    },
    Open_time: {
        type: String,
        required: [true, 'Please add a opentime']
    },
    Close_time: {
        type: String,
        required: [true, 'Please add a closetime']
    }
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
});

//reverse populate with virtuals
CoworkingSpaceSchema.virtual('reservations',{
    ref:'Reservation',
    localField:'_id',
    foreignField:'coworking',
    justOne:false
})

const CoworkingSpace = mongoose.models.CoworkingSpace || mongoose.model("CoworkingSpace", CoworkingSpaceSchema)
export default CoworkingSpace