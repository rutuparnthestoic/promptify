//Three types of requests : 

//GET (For reading one specific prompt)
import { connectToDB } from "@utils/database";
import  Prompt  from '@models/prompt';
import { ESLINT_PROMPT_VALUES } from "next/dist/lib/constants";

//[id] is passed through params, which is then used for getting the id of the prompt
export const GET = async (req, {params}) => {
    try{
        //connecting to database
        await connectToDB();

        //getting the prompt from the DB with the passed id.
        const prompt = await Prompt.findById(params.id).populate('creator');


        if(!prompt){
            return new Response("Prompt not found", {status: 404})
        }
        //else return the got response 
        //returning them as response 
        return new Response(JSON.stringify(prompt), {
            status: 200
        })
    } catch(err) {
        return new Response("Failed to fetch", {
            status: 500
        })
    }
}


//PATCH (For updating)
 export const PATCH = async (req, {params}) => {
    const { prompt, tag} = await req.json();

    try{
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt){
            return new Response("Prompt not found", {status: 404})
        }

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt), {status:200})
    } catch(err){
        return new Response("Failed", {status:500})
    }
 }


//DELETE (For deleting)
export const DELETE = async (req, {params}) => {
    try{
        await connectToDB();

        await Prompt.findByIdAndDelete(params.id);
        
        return new Response("Prompt deleted successfully!", {status: 200})
        
    } catch(err){
        return new Response("Failed to delete prompt", {status: 500})
    }
}
