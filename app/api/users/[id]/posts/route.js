import { connectToDB } from "@utils/database";
import  Prompt  from '@models/prompt';

export const GET = async (req, {params}) => {
    try{
        //connecting to database
        await connectToDB();

        //getting only the prompts from the DB which has the id of the particular creator.
        const prompts = await Prompt.find({
            creator: params.id
        }).populate('creator');

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