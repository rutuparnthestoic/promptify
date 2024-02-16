import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () =>{
    mongoose.set('strictQuery', true)
    if(isConnected){
        console.log('Connected already')
        return;
    } 
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })

        isConnected = true;

        console.log('DB Connected');
    } catch(err) {
        console.log(err);
    }

}