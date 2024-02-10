import  {Schema, models, model} from "mongoose";



// this is just for good practice mongoose will have that promise build-in so its optional
// mongoose.Promise = global.Promise


const UserSchema = new Schema({
    name: String,
    email: String,
    password: String
},{timestamps:true}
)

export const User = models?.User || model("User", UserSchema)