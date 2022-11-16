import { serverPusher } from "./../../pusher";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../redis";
import { MessageTP } from "../../typings";

type Data = {
  message: MessageTP
}

type ErrorData = {
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {

    if(req.method !== "POST"){
        res.status(405).json({body: "Method Not Allowed"});
        return;
    };

    const {message} = req.body;

    const newMessage = {
        ...message,
        created_at: Date.now(),
    }

    // push message to redis database
    await redis.hset('messages', message.id, JSON.stringify(newMessage));

    serverPusher.trigger('messages', 'new-message', newMessage);

  res.status(200).json({ message: newMessage })
}