"use client";

import { FormEvent, useState } from "react";
import {v4 as uuid} from 'uuid';
import { MessageTP } from "../typings";
import useSWR from "swr";
import fetcher from "../utils/messageFetcher";
function ChatInput() {
    const [message, setMessage] = useState("");
    const {data : messages, error, mutate} = useSWR("/api/getMessages", fetcher);
    console.log("data: ", messages);

    const messageHandler = async (e: FormEvent<HTMLFormElement>) => {
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
            profile: "https://i.pinimg.com/236x/b0/86/1e/b0861e61d7f872e983429ce37ea27ba5.jpg",
            // profile: "https://i.pinimg.com/564x/bc/54/db/bc54db2ddf6c4ffe4801fc41bbeaa78a.jpg",
            // profile: "https://media.istockphoto.com/id/1304774743/photo/person-disguised-as-a-cow-counting-the-number-two-on-his-fingers.jpg?s=612x612&w=0&k=20&c=VJVw_HxbOdvXhN513vhl3O6vdK6_xpVvKcHoOHVgNIs=",
            email: "rockavk14039@gmail.com",
        }

        uploadMessageToUpstash(messageData);
        await mutate(uploadMessageToUpstash(messageData), {
            optimisticData: [messageData, ...messages!],
            rollbackOnError: true,
        })
    }

    const uploadMessageToUpstash = async (paylaod: MessageTP) => {
        const data = await fetch('/api/addMessage',{
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                message : paylaod,
            })
        }).then(res => res.json());


        const message = await data.message;

        console.log("message added succesfully", message);

       return [message, ...messages!];

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