import React from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useHistory } from "react-router-dom";

export default function Navbar() {
    const history = useHistory();
    function handleClick() {
        AuthService.logout();
        history.push("/login");
    }

    return (
        <div className="container-navbar">
            <nav className="container navbar">
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/posts">Posts</Link>
                    </li>
                    <li>
                        <Link to="/users">Users</Link>
                    </li>
                    <li>
                        <Link to="/contacts">Chat</Link>
                    </li>
                </ul>
                <button onClick={handleClick}>Logout</button>
            </nav>
        </div>
    );
}
