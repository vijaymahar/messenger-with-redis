"use client";

import { FormEvent, useState } from "react";
import {v4 as uuid} from 'uuid';
import { MessageTP } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/messageFetcher";
function ChatInput() {
    const [message, setMessage] = useState("");
    const {data, error, mutate} = useSWR("/api/getMessages", fetcher);
    console.log("data: ", data);
    const messageHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(!message) return;
        const messageToSend = message;
        setMessage("")

        const id = uuid();

        const messageData: MessageTP = {
            id,
            message: messageToSend,
            created_at: Date.now(),
            username: "vijay kumar",
            profile: "https://unsplash.com/photos/uoNCveiK374?utm_source=unsplash&utm_medium=referral&utm_content=creditShareLink",
            email: "rockavk14039@gmail.com",
        }

        uploadMessageToUpstash(messageData);
    }

    const uploadMessageToUpstash = async (paylaod: MessageTP) => {
        const response = await fetch('/api/addMessage',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message : paylaod,
            })
        });

        const data = await response.json();

        console.log("message added succesfully", data);
        
    }



    return (
        <form onSubmit={messageHandler} className="flex px-2 py-5 space-x-2 border-t border-gray-100 fixed bottom-0 w-full z-50 bg-white">
            <input
                type="text"
                placeholder="Enter message here ..."
                // disabled={true}
                className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:pointer-events-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            <button
                type="submit"
                disabled={!message}
                className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Send
            </button>
        </form>
    )
}

export default ChatInput