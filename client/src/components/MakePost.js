import React, { useRef } from "react";
import PostsService from "../services/PostsService";

export default function MakePost({ addPost }) {
    const titleRef = useRef();
    const descriptionRef = useRef();
    const contentRef = useRef();

    async function handleSubmit(e) {
        e.preventDefault();

        const title = titleRef.current.value;
        const description = descriptionRef.current.value;
        const content = contentRef.current.value;

        addPost(title, description, content);
        // console.log(post);

        titleRef.current.value = "";
        descriptionRef.current.value = "";
        contentRef.current.value = "";
    }

    return (
        <form className="card card-make-post" onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="title">Title</label>
                <input
                    name="title"
                    id="title"
                    type="text"
                    placeholder="Enter title"
                    ref={titleRef}
                    required
                ></input>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                    name="description"
                    id="description"
                    type="text"
                    placeholder="Enter description (optionaly)"
                    ref={descriptionRef}
                ></input>
            </div>
            <div className="form-group">
                <label htmlFor="content">Content</label>
                <textarea
                    name="content"
                    id="content"
                    type="text"
                    placeholder="Enter content"
                    ref={contentRef}
                    required
                ></textarea>
            </div>
            <button type="submit" className="submit">
                Post
            </button>
        </form>
    );
}
