import Link from "next/link"

const Form = ({
type,
post,
setPost,
submitting,
handleSubmit
}) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Post</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your amazing prompts that work
        seamlessly with any AI and help your fellow learners
        to make AI their best friend !
      </p>

      <form
       onSubmit={handleSubmit}
       className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Your Prompt 
          </span>
          <textarea
           value={post.prompt}
           onChange={(e) => setPost({...post, prompt: e.target.value})}
           placeholder="Enter your prompt here.."
           required
           className="form_textarea"
          />

        </label>
        <label>
          <span className="font-satoshi font-semibold text-base text-gray-700">
            Tag  
            <span> (eg. #product, #webdev, #idea) </span>
          </span>
          <input
           value={post.tag}
           onChange={(e) => setPost({...post, tag: e.target.value})}
           placeholder="#tag"
           required
           className="form_input"
          />

        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
        <button type="submit" disabled={submitting} 
          className="px-5 py-1.5 text-sm bg-primary-violet rounded-full text-white"
          >
          {submitting ? `${type}...` : type}
          </button>
          <Link href='/' className="text-gray-500 text-sm">
            Cancel
          </Link>
          
        </div>
      </form>
    </section>
  )
}

export default Form