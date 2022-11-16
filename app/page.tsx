import { MessageTP } from "../typings";
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"

async function HomePage() {
  const data = await fetch(`${process.env.VERCEL_URL || 'http://localhost:1411'}/api/getMessages`).then(res => res.json());
  console.log("at-7",data)
  const messages : MessageTP[] = data.messages;
  return (
    <div className="text-sm ">
        <MessageList initialMessages={messages} />
        <ChatInput  />
    </div>
  )
}

export default HomePage