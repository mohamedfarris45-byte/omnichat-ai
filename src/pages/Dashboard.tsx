import React, { useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import ChatList from "@/components/dashboard/ChatList";
import ChatView from "@/components/dashboard/ChatView";
import AIPanel from "@/components/dashboard/AIPanel";
import { Helmet } from "react-helmet-async";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  time: string;
  platform: "telegram" | "discord";
  senderName?: string;
  replyTo?: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  platform: "telegram" | "discord";
}

// Mock data - different messages per chat
const initialChatMessages: Record<string, Message[]> = {
  "1": [
    { id: "1-1", content: "Hey! How's the project going?", sender: "other", time: "10:30 AM", platform: "telegram", senderName: "Alex" },
    { id: "1-2", content: "Going well! Just finished the design phase.", sender: "user", time: "10:32 AM", platform: "telegram" },
    { id: "1-3", content: "Nice work on the designs! 🎨", sender: "other", time: "10:33 AM", platform: "discord", senderName: "Alex" },
    { id: "1-4", content: "Thanks! The team really came together on this one.", sender: "user", time: "10:35 AM", platform: "discord" },
    { id: "1-5", content: "Can you send me the project files?", sender: "other", time: "10:36 AM", platform: "telegram", senderName: "Alex" },
  ],
  "2": [
    { id: "2-1", content: "Anyone up for some games tonight?", sender: "other", time: "8:00 PM", platform: "discord", senderName: "Jake" },
    { id: "2-2", content: "I'm in! What time?", sender: "user", time: "8:05 PM", platform: "discord" },
    { id: "2-3", content: "Let's start at 9 PM", sender: "other", time: "8:10 PM", platform: "discord", senderName: "Mike" },
    { id: "2-4", content: "Perfect, see you then!", sender: "user", time: "8:12 PM", platform: "discord" },
    { id: "2-5", content: "GG everyone! Same time tomorrow?", sender: "other", time: "11:30 PM", platform: "discord", senderName: "Jake" },
  ],
  "3": [
    { id: "3-1", content: "Hi! Are we still meeting tomorrow?", sender: "other", time: "2:00 PM", platform: "telegram", senderName: "Sarah" },
    { id: "3-2", content: "Yes! 3 PM works for me", sender: "user", time: "2:15 PM", platform: "telegram" },
    { id: "3-3", content: "Great! I'll send the calendar invite", sender: "other", time: "2:20 PM", platform: "telegram", senderName: "Sarah" },
    { id: "3-4", content: "The meeting is confirmed for 3 PM", sender: "other", time: "2:30 PM", platform: "telegram", senderName: "Sarah" },
  ],
  "4": [
    { id: "4-1", content: "Has anyone tried the new React 19 features?", sender: "other", time: "9:00 AM", platform: "discord", senderName: "DevBot" },
    { id: "4-2", content: "The new compiler is amazing!", sender: "other", time: "9:15 AM", platform: "discord", senderName: "Alice" },
    { id: "4-3", content: "I've been testing it, pretty solid so far", sender: "user", time: "9:30 AM", platform: "discord" },
    { id: "4-4", content: "Check out this new React hook...", sender: "other", time: "10:00 AM", platform: "discord", senderName: "Bob" },
    { id: "4-5", content: "That's really useful for state management", sender: "user", time: "10:15 AM", platform: "discord" },
  ],
  "5": [
    { id: "5-1", content: "Team standup reminder for tomorrow", sender: "other", time: "4:00 PM", platform: "telegram", senderName: "TeamBot" },
    { id: "5-2", content: "Got it, I'll prepare my updates", sender: "user", time: "4:10 PM", platform: "telegram" },
    { id: "5-3", content: "Don't forget to update the Jira board", sender: "other", time: "4:30 PM", platform: "telegram", senderName: "Manager" },
    { id: "5-4", content: "Sprint planning tomorrow at 10", sender: "other", time: "5:00 PM", platform: "telegram", senderName: "Manager" },
  ],
};

const mockChats: Chat[] = [
  {
    id: "1",
    name: "Alex Johnson",
    lastMessage: "Can you send me the project files?",
    time: "2m",
    unread: 2,
    platform: "telegram",
  },
  {
    id: "2",
    name: "Gaming Squad",
    lastMessage: "GG everyone! Same time tomorrow?",
    time: "15m",
    unread: 5,
    platform: "discord",
  },
  {
    id: "3",
    name: "Sarah Miller",
    lastMessage: "The meeting is confirmed for 3 PM",
    time: "1h",
    unread: 0,
    platform: "telegram",
  },
  {
    id: "4",
    name: "Dev Community",
    lastMessage: "Check out this new React hook...",
    time: "2h",
    unread: 12,
    platform: "discord",
  },
  {
    id: "5",
    name: "Work Team",
    lastMessage: "Sprint planning tomorrow at 10",
    time: "3h",
    unread: 0,
    platform: "telegram",
  },
];

const Dashboard = () => {
  const [activeChat, setActiveChat] = useState<string | null>("1");
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState(initialChatMessages);

  const currentMessages = activeChat ? chatMessages[activeChat] || [] : [];
  const currentChat = mockChats.find((c) => c.id === activeChat);

  const handleSendMessage = (content: string, replyTo?: Message) => {
    if (!activeChat) return;
    
    const newMessage: Message = {
      id: `${activeChat}-${Date.now()}`,
      content,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      platform: currentChat?.platform || "telegram",
      replyTo: replyTo?.id,
    };
    
    setChatMessages((prev) => ({
      ...prev,
      [activeChat]: [...(prev[activeChat] || []), newMessage],
    }));
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
        {activeChat && currentChat ? (
          <ChatView
            chatName={currentChat.name}
            messages={currentMessages}
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