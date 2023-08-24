"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={(e) => handleTagClick(e)}
        />
      ))}
    </div>
  );
};
const Feed = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);


  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (posts.length !== 0) {
      setFilteredPosts(posts);
      const filteredData = posts.filter(
        (post) =>
          post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          post.tag.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredPosts(filteredData);
    }
  }, [searchText]);


  console.log(filteredPosts);
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={(e) => handleSearchChange(e)}
          required
          className="search_input peer"
        ></input>
      </form>

      <PromptCardList data={filteredPosts} handleTagClick={(e) => handleTagClick(e)} />
    </section>
  );
};

export default Feed;
