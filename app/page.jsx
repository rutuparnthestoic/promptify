//This is the home page of the app.
//No need to import react in Next js
//Rest everything is same as React 
import Feed from "@components/Feed"

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center"> 
        Discover and Share 
        <br className="max-md:hidden" />
        <span className="violet_gradient"> AI Prompts</span>
      </h1>
      <p className="desc text-center">
      Promptify is a platform for you to make AI your best friend, 
      by creating, discovering and sharing the finest AI prompts.
      </p>

      <Feed />
    </section>
  )
}

export default Home