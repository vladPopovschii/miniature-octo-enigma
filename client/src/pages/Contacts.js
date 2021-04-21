import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useHistory } from "react-router-dom";
import AuthService from "../services/AuthService";
import Chat from "../components/Chat";
import ChatService from "../services/ChatService";
import { SocketProvider } from "../contexts/SocketProvider";

export default function Contacts() {
    const history = useHistory();
    const [user, setUser] = useState(null);
    const [receiver, setReceiver] = useState(null);
    const [room, setRoom] = useState(null);

    useEffect(async () => {
        const currentUser = await AuthService.getCurrentUser();
        if (!currentUser) history.push("/login");
        setUser(currentUser);
    }, []);

    useEffect(async () => {
        const room = await ChatService.getRoom(receiver?._id);
        setRoom(room?.room);
    }, [receiver]);

    function changeChat(receiver) {
        setReceiver(receiver);
    }
    return !user ? (
        "Loading"
    ) : (
        <>
            <Navbar user={user} />
            <SocketProvider id={user._id}>
                <div className="chat-wrapper">
                    <Sidebar changeChat={changeChat} user={user} />
                    {!receiver ? (
                        ""
                    ) : (
                        <Chat user={user} receiver={receiver} room={room} />
                    )}
                </div>
            </SocketProvider>
        </>
    );
}
