import React from "react";
import { KEYS } from "../KEYS";

export default function UserCard({ username, profileImage }) {
    return (
        <div className="card card-user">
            <img src={`${KEYS.API_URL}api/image/` + profileImage}></img>
            <h3>{username}</h3>
        </div>
    );
}
