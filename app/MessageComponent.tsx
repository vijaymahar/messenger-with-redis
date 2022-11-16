import Image from "next/image"
import { MessageTP } from "../typings"

function MessageComponent({ message }: { message: MessageTP }) {
    const isUser = true;
    return (
        <div className={`flex w-fit ${isUser && 'ml-auto'}`}>
            <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
                <Image src={message.profile} className="rounded-full mx-2 object-contain" height={10} width={50} alt={message.username} />
            </div>
            <div>
                    <p className={`text-[0.65rem] px-[2px] pb-[2px]  ${isUser ? "text-indigo-500 text-right" : "text-violet-500 text-left"}`}>
                        {message.username}
                    </p>
                <div className="flex items-end">
                    <div className={`${isUser ? "bg-indigo-500 ml-auto order-2" : "bg-violet-500 text-left"} rounded-md px-2 py-2 text-white font-semibold`}>
                        <p>{message.message}</p>
                    </div>
                    <p className={`text-[0.65rem] italic text-gray-400 ${isUser && 'text-right'}`}>{new Date(message.created_at).toLocaleString()}</p>
                </div>
            </div>
        </div>
    )
}

export default MessageComponent