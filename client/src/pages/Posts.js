import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import PostsService from "../services/PostsService";
import Navbar from "../components/Navbar";
import MakePost from "../components/MakePost";
import Post from "../components/Post";

export default function Posts() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    async function addPost(title, content, description) {
        const post = await PostsService.makePost(title, content, description);
        setPosts((prevPosts) => [post.post, ...prevPosts]);
    }

    useEffect(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (!currentUser) history.push("/login");
        setUser(currentUser);

        const newPosts = await PostsService.getAllPosts();
        setPosts(newPosts?.posts);

        return () => {};
    }, []);

    return (
        <>
            <Navbar />
            <div className="container">
                <MakePost addPost={addPost}></MakePost>
                <div className="posts-container">
                    {posts.map((post) => (
                        <Post key={post._id} post={post} />
                    ))}
                </div>
            </div>
        </>
    );
}
