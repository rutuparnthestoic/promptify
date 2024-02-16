"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
    const router = useRouter(); 

    const {data : session} = useSession();
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //Fxn that fetches the post from the api.
        const fetchPosts = async () => {
          //Fetching only the posts of the user whose profile is being viewed.
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          //Converted into json format in data.
          const data = await response.json();
    
          //posts state updated to data.
          setPosts(data);
        }
    
        //Only fetch the data when we have the user whose data is to be fetched.
       if(session?.user.id) fetchPosts();
      }, [session?.user.id])

    const handleEdit = (post) => { 
        router.push(`/update-prompt?id=${post._id}`)
    }
    
    const handleDelete = async (post) => {
      const hasConfirmed = confirm("Delete the post permanently?");

      if(hasConfirmed){
        try{
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: 'DELETE'
          });

          const filteredPosts = posts.filter((p) => p._id !== post._id);
          setPosts(filteredPosts);
        } catch(err){
          console.log(err);
        }
      }
    }
    


  return (
    <Profile 
     name="My"
     desc=""
     data={posts}
     handleEdit={handleEdit}
     handleDelete={handleDelete}
    />
  )
}

export default MyProfile