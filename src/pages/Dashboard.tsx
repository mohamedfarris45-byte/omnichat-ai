import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatList from "@/components/dashboard/ChatList";
import ChatView from "@/components/dashboard/ChatView";
import AIPanel from "@/components/dashboard/AIPanel";
import { Helmet } from "react-helmet-async";

// Mock data - unified list from both platforms
const mockChats = [
  {
    id: "1",
    name: "Alex Johnson",
    lastMessage: "Can you send me the project files?",
    time: "2m",
    unread: 2,
    platform: "telegram" as const,
  },
  {
    id: "2",
    name: "Gaming Squad",
    lastMessage: "GG everyone! Same time tomorrow?",
    time: "15m",
    unread: 5,
    platform: "discord" as const,
  },
  {
    id: "3",
    name: "Sarah Miller",
    lastMessage: "The meeting is confirmed for 3 PM",
    time: "1h",
    unread: 0,
    platform: "telegram" as const,
  },
  {
    id: "4",
    name: "Dev Community",
    lastMessage: "Check out this new React hook...",
    time: "2h",
    unread: 12,
    platform: "discord" as const,
  },
  {
    id: "5",
    name: "Work Team",
    lastMessage: "Sprint planning tomorrow at 10",
    time: "3h",
    unread: 0,
    platform: "telegram" as const,
  },
];

const mockMessages = [
  { id: "1", content: "Hey! How's the project going?", sender: "other" as const, time: "10:30 AM" },
  { id: "2", content: "Going well! Just finished the design phase.", sender: "user" as const, time: "10:32 AM" },
  { id: "3", content: "That's great! Can you send me the project files?", sender: "other" as const, time: "10:33 AM" },
  { id: "4", content: "Sure, I'll package them up and send shortly.", sender: "user" as const, time: "10:35 AM" },
  { id: "5", content: "Perfect! Also, do we have the meeting confirmed for tomorrow?", sender: "other" as const, time: "10:36 AM" },
];

const Dashboard = () => {
  const [activeChat, setActiveChat] = useState<string | null>("1");
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [messages, setMessages] = useState(mockMessages);

  const handleSendMessage = (content: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content,
      sender: "user" as const,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
  };

  const selectedChat = mockChats.find((c) => c.id === activeChat);

  return (
    <>
      <Helmet>
        <title>Dashboard - UniChat</title>
        <meta name="description" content="Manage your unified conversations from Telegram and Discord with AI assistance." />
      </Helmet>
      <div className="h-screen flex bg-background overflow-hidden">
        <Sidebar />
        <ChatList
          chats={mockChats}
          activeChat={activeChat}
          onChatSelect={setActiveChat}
        />
        {activeChat && selectedChat ? (
          <ChatView
            chatId={activeChat}
            platform={selectedChat.platform}
            messages={messages}
            onSendMessage={handleSendMessage}
            onOpenAI={() => setIsAIPanelOpen(true)}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
        <AIPanel
          isOpen={isAIPanelOpen}
          onClose={() => setIsAIPanelOpen(false)}
          onGenerateMessage={(msg) => {
            handleSendMessage(msg);
            setIsAIPanelOpen(false);
          }}
        />
      </div>
    </>
  );
};

export default Dashboard;
