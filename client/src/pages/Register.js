import React, { useState, useEffect, useRef, useReducer } from "react";
import { useHistory, Link } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function Register() {
    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();
    const history = useHistory();
    const [user, setUser] = useState(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (currentUser) history.push("/");
        return currentUser;
    });

    const [error, setError] = useState("");

    async function handleSubmit(e) {
        setError();
        e.preventDefault();
        const res = await AuthService.register(
            usernameRef.current.value,
            emailRef.current.value,
            passwordRef.current.value,
            confirmPasswordRef.current.value
        );
        if (!res) return;
        if (res.error) {
            setError(res.error);
            return;
        }
        alert("Registered succesfully");
        history.push("/login");
    }

    return (
        <div className="container center">
            <div className="card">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                    <div className="error">{error}</div>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            name="username"
                            id="username"
                            type="text"
                            ref={usernameRef}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            name="email"
                            id="email"
                            type="email"
                            ref={emailRef}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            id="password"
                            type="password"
                            ref={passwordRef}
                            required
                        ></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">
                            Confirm Password
                        </label>
                        <input
                            name="confirmPassword"
                            id="confirmPassword"
                            type="password"
                            ref={confirmPasswordRef}
                            required
                        ></input>
                    </div>
                    <button className="submit">Register</button>
                </form>
                <div className="card-info">
                    Already have an account?
                    <Link to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}
