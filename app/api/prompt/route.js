import { connectToDB } from "@utils/database";
import  Prompt  from '@models/prompt';

export const GET = async (req) => {
    try{
        //connecting to database
        await connectToDB();

        //getting all prompts from the DB
        const prompts = await Prompt.find({}).populate('creator');

        //returning them as response 
        return new Response(JSON.stringify(prompts), {
            status: 200
        })
    } catch(err) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}