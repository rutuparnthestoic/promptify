import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email:{
        type:String,
        unique: [true, 'User with this email already exists'],
        required: [true, 'Email is required !']
    }, 
    username: {
        type: String,
        required: [true, 'Username is required!'],
        match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});
//Here we check if the User model exists already
const User = models.User || model("User", userSchema);

export default User;