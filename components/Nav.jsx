"use client"; //We will render Nav on client side as we are using hooks here.

import Link from "next/link" //In order to ease the access of pages from Nav bar
import Image from "next/image" //Automatically optimizes images on the website
import {useState, useEffect} from 'react'; //Hooks from react
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'; //Utility fxns for easing sign in and sign out flow.

const Nav = () => {
  const {data : session} = useSession();
  const [providers, setProviders] = useState(null); //In order to use sign in and out we need providers which we will get from getproviders fucntion.
 //Providers essentially means the way users can sign in, eg Google auth, Facebook, Gmail etc.
 
  const [toggleDropdown, setToggleDropdown] = useState(false); //For drop down Nav

  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();

      setProviders(response);
    }
    setUpProviders();
  }, []
  
  ) 

  return (
    <nav className="flex-between w-full mb-16 pt-3">
     <Link href="/" className="flex gap-2 flex-center">
      <Image 
        src="/assets/images/logo.svg"
        alt="Promptify"
        width={30}
        height={30}
        className="object-contain"
      />
      <p className="logo_text">Promptify</p>
     </Link>

     {/* Desktop navigation */}
     <div className="sm:flex hidden">
      {session?.user ? (
        <div className="flex gap-3 md:gap-5">
          <Link href="/create-prompt"
           className="black_btn">
            New Post
           </Link>

           <button type="button" onClick={signOut} className="outline_btn">
           Sign Out
           </button>

           <Link href="/profile">
            <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
            />
           </Link>
        </div>
      ) : (
        <> 
        {providers && 
         Object.values(providers).map((provider) => 
         (
          <button type="button" key={provider.name}
          onClick={() => signIn(provider.id)}
          className="black_btn">
            Sign In
          </button>
         ))}
        </>
      )}
     </div>

     {/* Mobile Navigation */}
     <div className="sm:hidden flex relative">
      {session?.user ? (
        <div className="flex">
        <Image 
              src={session?.user.image}
              width={37}
              height={37}
              className="rounded-full"
              alt="profile"
              onClick={() => setToggleDropdown((prev) => !prev)} //We do not directly change the state variable, instead we give a callback fxn and access the previous value to change it.
            />
          {toggleDropdown && (
            <div className="dropdown">
              <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button type="button"
              onClick={() => {
                setToggleDropdown(false);
                signOut();
              }}
              className="mt-5 w-full black_btn"
              >
              Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <>
        {providers && 
         Object.values(providers).map((provider) => 
         (
          <button type="button" key={provider.name}
          onClick={() => signIn(provider.id)}
          className="black_btn">
            Sign In
          </button>
         ))}
        </>
      )}
     </div>

    </nav>
  )
}

export default Nav