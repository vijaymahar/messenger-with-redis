// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import redis from "../../redis";
import { MessageTP } from "../../typings";

type Data = {
  messages: MessageTP[]
};

type DataError = {
    body: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | DataError>
) {
    if(req.method !== "GET"){
        res.status(405).json({body: "Method Not Allowed"});
        return;
    };

    const messagesFetched = await redis.hvals("messages");

    const newMessages: MessageTP[] = messagesFetched.map((msg : any) => JSON.parse(msg)).sort((a : MessageTP,b : MessageTP) => b.created_at - a.created_at);

  res.status(200).json({ messages: newMessages })
}
