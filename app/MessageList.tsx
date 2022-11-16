"use client";
import { useEffect } from "react";
import useSWR from "swr";
import { clientPusher } from "../pusher";
import { MessageTP } from "../typings";
import fetcher from "../utils/messageFetcher";
import MessageComponent from "./MessageComponent";

type PropTypes = {
  initialMessages: MessageTP[],
}
function MessageList({initialMessages} : PropTypes) {
  const {data : messages, error, mutate} = useSWR<MessageTP[]>("/api/getMessages", fetcher);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');

    channel.bind('new-message', async (data : MessageTP) => {
      const msgExist = messages?.find(msg => msg.id === data.id);
      if(msgExist) return;

      if(!messages) mutate(fetcher);
      else{
        mutate(fetcher, {
          optimisticData: [data, ...messages],
          rollbackOnError: true,
        });
      }
    })
  }, [messages, mutate, clientPusher]);
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
        {
          (messages || initialMessages)?.map((msg) => <MessageComponent key={msg.id} message={msg} />)
        }
    </div>
  )
}

export default MessageList