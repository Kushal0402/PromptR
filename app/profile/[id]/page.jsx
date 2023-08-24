"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const params = useParams();
  const router = useRouter();
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const users = await fetch(`/api/users/${params.id}`);
      const userData = await users.json();
      setUser(userData[0])
    }
    fetchUser();

    const fetchPosts = async () => {
      const posts = await fetch(`/api/users/${params.id}/posts`);
      const postsData = await posts.json();
      setPosts(postsData);
    };
    fetchPosts();
  }, [params?.id]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure you want to delete this prompt");

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        const filteredPosts = posts.filter((p) => p._id !== post._id);

        setPosts(filteredPosts);
      } catch (err) {
        alert(err);
      }
    }
  };

  return (
    <Profile
      name={user.username}
      image={user.image}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
