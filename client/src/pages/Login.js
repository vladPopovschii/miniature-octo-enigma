import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { KEYS } from "../KEYS";
import AuthService from "../services/AuthService";

export default function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const history = useHistory();
    const [user, setUser] = useState(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) history.push("/");
        return currentUser;
    });

    async function handleSubmit(e) {
        e.preventDefault();

        const res = await AuthService.login(
            emailRef.current.value,
            passwordRef.current.value
        );
        if (!res) return;
        if (res.error) {
            setError(res.error);
            return;
        }
        history.push("/");
    }

    return (
        <div className="container center">
            <div className="card">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="error">{error}</div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            ref={emailRef}
                            name="email"
                            id="email"
                            type="email"
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            ref={passwordRef}
                            name="password"
                            id="password"
                            type="password"
                        ></input>
                    </div>
                    <button className="submit">Login</button>
                </form>
                <div className="card-info">
                    Don't have an account?
                    <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
