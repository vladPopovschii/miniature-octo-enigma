import React, { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";
import { KEYS } from "../KEYS";

export default function Home() {
    const history = useHistory();
    const [user, setUser] = useState({});

    const [isEditOpen, setisEditOpen] = useState(false);
    const [isUpdateAvatarOpen, setisUpdateAvatarOpen] = useState(false);
    const usernameRef = useRef();
    const avatarRef = useRef();

    async function handleEdit(e) {
        e.preventDefault();
        const username = usernameRef.current.value;

        if (username === "") return;
        setisEditOpen("");
        const result = await UserService.updateUsername(username);
        if (result.error) return alert("Username failed to update");
        setUser(result.user);
    }

    async function handleUpdateAvatar(e) {
        e.preventDefault();

        const image = avatarRef.current.files[0];
        const result = await UserService.updateUserAvatar(image);
        setisUpdateAvatarOpen(false);
        if (result) setUser(result);
    }

    useEffect(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (!currentUser) history.push("/login");
        setUser(currentUser);
    }, []);

    return (
        <>
            <Navbar />
            <div className="container center">
                <div className="card">
                    <img
                        className="card-image"
                        src={`${KEYS.API_URL}api/image/` + user?.profileImage}
                    ></img>
                    <h1>Hello, {user?.username}</h1>
                    <button
                        className="submit primary"
                        onClick={() => setisEditOpen(!isEditOpen)}
                    >
                        Update username
                    </button>
                    <form
                        className={isEditOpen ? "" : "hidden"}
                        onSubmit={handleEdit}
                    >
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter new username"
                                ref={usernameRef}
                            />
                        </div>
                        <button className="submit" type="submit">
                            Edit
                        </button>
                    </form>
                    <button
                        className="submit primary"
                        onClick={() =>
                            setisUpdateAvatarOpen(!isUpdateAvatarOpen)
                        }
                    >
                        Update avatar
                    </button>
                    <form
                        className={isUpdateAvatarOpen ? "" : "hidden"}
                        onSubmit={handleUpdateAvatar}
                    >
                        <div className="form-group">
                            <input
                                type="file"
                                placeholder="Enter new username"
                                ref={avatarRef}
                            />
                        </div>
                        <button className="submit" type="submit">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
