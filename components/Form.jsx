import React from "react";
import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-secondary-main">{type} Post</h1>
      <p className="desc max-w-md">{type} amazing prompts and share with the world</p>

      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span className="font-satoshi font-bold">Your AI Prompt</span>
          <textarea
            value={post.prompt}
            onChange={(e) => setPost({ ...post, prompt: e.target.value })}
            placeholder="Your prompt goes here"
            required
            className="form_textarea"
          />
        </label>

        <label>
          <span className="font-satoshi font-bold">Tag</span>
          <input
            value={post.tag}
            onChange={(e) => setPost({ ...post, tag: e.target.value })}
            placeholder="#tag"
            required
            className="form_input"
          />
        </label>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-md text-gray-700 border-2 border-gray-600 rounded-full px-5 py-1.5 duration-150 hover:bg-gray-600 hover:text-white">
            Cancel
          </Link>

          <button
          type="submit"
          disabled={submitting}
          className="px-5 py-1.5 text-md bg-secondary-main rounded-full text-white duration-150 hover:bg-white hover:text-secondary-main">
            { submitting ? `Please Wait...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
