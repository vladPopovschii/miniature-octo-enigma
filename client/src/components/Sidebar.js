import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { KEYS } from "../KEYS";

export default function Sidebar({ user, changeChat }) {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        let newUsers = await UserService.getAllUsers();
        newUsers = newUsers.filter((newUser) => newUser._id !== user?._id);
        setUsers(newUsers);
    }, []);

    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                {users.map((user) => (
                    <li
                        className="sidebar-item"
                        key={user._id}
                        onClick={() => changeChat(user)}
                    >
                        <img
                            src={`${KEYS.API_URL}api/image/${user.profileImage}`}
                        ></img>
                        {user.username}
                    </li>
                ))}
            </ul>
        </div>
    );
}
