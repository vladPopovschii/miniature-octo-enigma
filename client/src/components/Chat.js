import React, { useState, useEffect, useRef } from "react";
import uuid from "react-uuid";
import { useSocket } from "../contexts/SocketProvider";
import Message from "./Message";

export default function Chat({ user, receiver, room }) {
    const [messages, setMessages] = useState([]);
    const messageRef = useRef();
    const chatRef = useRef();
    const socket = useSocket();

    function handleSendMessage(e) {
        e.preventDefault();
        const message = messageRef.current.value;
        if (message === "") return;

        socket.emit("send-message", room._id, receiver._id, message);
        messageRef.current.value = "";
        setMessages((prevMessages) => [
            ...prevMessages,
            {
                body: message,
                createdAt: Date.now(),
                user: user._id,
                _id: Date.now() + uuid(),
            },
        ]);
    }

    useEffect(() => {
        setMessages([]);
        setMessages(room?.messages);
        return () => {};
    }, [room]);

    useEffect(() => {
        socket.on("receive-message", (message, receiverId) => {
            if (receiverId === receiver?._id) {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        });
    }, []);

    const scrollToBottom = () => {
        chatRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return !room ? (
        ""
    ) : (
        <div className="chat-container">
            <header className="chat-header">
                {receiver?.username || "default"}
            </header>
            <div className="message-list">
                {messages?.map((message) => (
                    <Message
                        key={message._id}
                        message={message}
                        userId={user._id}
                    />
                ))}
                <div ref={chatRef}></div>
            </div>
            <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    placeholder="Enter your message"
                    ref={messageRef}
                />
                <button className="submit">Send</button>
            </form>
        </div>
    );
}
