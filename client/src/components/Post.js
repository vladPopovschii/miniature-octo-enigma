import React, { useEffect, useState } from "react";
import { KEYS } from "../KEYS";

function formatDate(date) {
    const newDate = new Date(date)
        .toISOString()
        .replace(/T/, " ")
        .replace(/\..+/, "");
    return newDate;
}

export default function Post({ post }) {
    const [date, setDate] = useState(post.createdAt);

    useEffect(() => {
        setDate(formatDate(date));
    }, []);
    return (
        <div className="card card-post">
            <div className="post-header">
                <div className="post-user">
                    <img
                        src={`${KEYS.API_URL}api/image/${post?.owner?.profileImage}`}
                    ></img>
                    <div>{post.owner.username}</div>
                </div>
                <div className="post-date">{date}</div>
            </div>
            <div className="post-body">
                <h2>{post.title}</h2>
                <div className="post-description">{post.description}</div>
                <div className="post-content">{post.content}</div>
            </div>
        </div>
    );
}
