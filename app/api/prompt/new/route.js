//Created a new route for handling the API call we made in create post.

import { connectToDB } from "@utils/database";
import  Prompt  from '@models/prompt';

export const POST = async (req) => { //Simple fxn to setup the API route.
    const { userId, prompt, tag } = await req.json(); // Destructuring the JSON coming thru API in order to use the data.

    try{
        await connectToDB(); //Everytime we want to use DB we have to call connect cause it is a Lambda fxn that means it will die after it is used unlike traditional servers.
        const newPrompt = new Prompt({
            creator : userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), {status: 201})


    } catch(err){
        console.log(err);
        return new Response("Failed", {status: 500})
    }
}