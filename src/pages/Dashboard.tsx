import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatList from "@/components/dashboard/ChatList";
import ChatView from "@/components/dashboard/ChatView";
import AIPanel from "@/components/dashboard/AIPanel";
import { Helmet } from "react-helmet-async";

// Mock data - unified messages from both platforms
const mockMessages = [
  { id: "1", content: "Hey! How's the project going?", sender: "other" as const, time: "10:30 AM", platform: "telegram" as const },
  { id: "2", content: "Going well! Just finished the design phase.", sender: "user" as const, time: "10:32 AM", platform: "telegram" as const },
  { id: "3", content: "Nice work on the designs! 🎨", sender: "other" as const, time: "10:33 AM", platform: "discord" as const },
  { id: "4", content: "Thanks! The team really came together on this one.", sender: "user" as const, time: "10:35 AM", platform: "discord" as const },
  { id: "5", content: "Can you send me the project files?", sender: "other" as const, time: "10:36 AM", platform: "telegram" as const },
  { id: "6", content: "Sure, I'll package them up and send shortly.", sender: "user" as const, time: "10:38 AM", platform: "telegram" as const },
  { id: "7", content: "Also, do we have the meeting confirmed for tomorrow?", sender: "other" as const, time: "10:40 AM", platform: "discord" as const },
  { id: "8", content: "Yes! 3 PM works for everyone.", sender: "user" as const, time: "10:42 AM", platform: "discord" as const },
];

// Mock chats for the sidebar
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
      platform: "telegram" as const, // Default to telegram for user messages
    };
    setMessages([...messages, newMessage]);
  };

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
        <ChatView
          messages={messages}
          onSendMessage={handleSendMessage}
          onOpenAI={() => setIsAIPanelOpen(true)}
        />
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