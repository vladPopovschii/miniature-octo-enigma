import React, { useState, useEffect } from "react";
import UserService from "../services/UserService";
import { KEYS } from "../KEYS";

export default function Sidebar({ user }) {
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const newUsers = await UserService.getAllUsers();
        setUsers(newUsers);
        console.log(users);
    }, []);

    return (
        <div className="sidebar">
            <ul className="sidebar-list">
                {users.map((user) => (
                    <li className="sidebar-item" key={user._id}>
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
