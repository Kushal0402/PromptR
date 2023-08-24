"use client";

import { useState, useEffect, useRef } from "react";

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
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const isInitialMount = useRef(true);

  const handleSearchChange = async (e) => {
    setSearchText(e.target.value);
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setPosts(data);
      setFilteredPosts(data);
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      if (posts.length !== 0) {
        const filteredData = posts.filter(
          (post) =>
            post.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
            post.tag.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPosts(filteredData);
      }
    }
  }, [searchText]);

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

      <PromptCardList
        data={filteredPosts}
        handleTagClick={(e) => handleTagClick(e)}
      />
    </section>
  );
};

export default Feed;
