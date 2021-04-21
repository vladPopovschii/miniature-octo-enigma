import React from "react";

function dateFormatter(date) {
    const newDate = new Date(date);
    let final = "";
    const h = `${newDate.getHours() < 10 ? "0" : ""}${newDate.getHours()}`;
    const m = `${newDate.getMinutes() < 10 ? "0" : ""}${newDate.getMinutes()}`;
    final = `${h}:${m}`;
    return final;
}

export default function Message({ message, userId }) {
    return (
        <div
            className={`message-container ${
                message.user === userId ? "right" : ""
            }`}
        >
            <div>{message.body}</div>
            <span>{dateFormatter(message.createdAt)}</span>
        </div>
    );
}
