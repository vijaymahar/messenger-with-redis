"use client";
import Image from "next/image";
import useSWR from "swr";
import { MessageTP } from "../typings";
import fetcher from "../utils/messageFetcher";
import MessageComponent from "./MessageComponent";
function MessageList() {
  const {data : messages, error, mutate} = useSWR<MessageTP[]>("/api/getMessages", fetcher);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
        {
          messages?.map((msg) => <MessageComponent key={msg.id} message={msg} />)
        }
    </div>
  )
}

export default MessageList