import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Contacts() {
    const history = useHistory();
    const [user, setUser] = useState({});

    useEffect(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (!currentUser) history.push("/login");
        setUser(currentUser);
    }, []);
    return !user ? (
        "Loading"
    ) : (
        <>
            <Navbar user={user} />
            <div className="chat-wrapper">
                <Sidebar />
            </div>
        </>
    );
}
