import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import Navbar from "../components/Navbar";
import UserCard from "../components/UserCard";
import UserService from "../services/UserService";

export default function User() {
    const history = useHistory();
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);

    useEffect(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (!currentUser) history.push("/login");
        setUser(currentUser);

        const newUsers = await UserService.getAllUsers();
        setUsers(newUsers);
    }, []);
    return (
        <>
            <Navbar />
            <div className="container">
                <div className="users-container">
                    {users.map((user) => (
                        <UserCard
                            key={user._id}
                            username={user.username}
                            profileImage={user.profileImage}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
