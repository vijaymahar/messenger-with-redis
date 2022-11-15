import React from 'react'
import ChatInput from "./ChatInput"
import MessageList from "./MessageList"

function HomePage() {
  return (
    <div className="text-sm ">
        <MessageList />
        <ChatInput  />
    </div>
  )
}

export default HomePage