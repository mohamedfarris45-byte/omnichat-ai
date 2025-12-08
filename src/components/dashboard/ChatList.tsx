import React from "react";
import { cn } from "@/lib/utils";
import { TelegramIcon, DiscordIcon } from "@/components/icons/PlatformIcons";
import { Search } from "lucide-react";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  platform: "telegram" | "discord";
  avatar?: string;
}

interface ChatListProps {
  chats: Chat[];
  activeChat: string | null;
  onChatSelect: (id: string) => void;
}

const ChatList = ({ chats, activeChat, onChatSelect }: ChatListProps) => {
  return (
    <div className="w-80 h-full bg-card border-r border-border flex flex-col shadow-sm">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search conversations..."
            className="w-full h-10 pl-10 pr-4 rounded-lg bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <button
            key={chat.id}
            onClick={() => onChatSelect(chat.id)}
            className={cn(
              "w-full flex items-start gap-3 p-4 border-b border-border/50 hover:bg-muted/50 transition-colors text-left",
              activeChat === chat.id && "bg-primary/5 border-l-2 border-l-primary"
            )}
          >
            {/* Avatar with platform indicator */}
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-muted to-accent flex items-center justify-center">
                <span className="text-lg font-semibold text-foreground">{chat.name[0]}</span>
              </div>
              <div
                className={cn(
                  "absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center shadow-sm",
                  chat.platform === "telegram" ? "bg-telegram" : "bg-discord"
                )}
              >
                {chat.platform === "telegram" ? (
                  <TelegramIcon className="w-3 h-3 text-white" />
                ) : (
                  <DiscordIcon className="w-3 h-3 text-white" />
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <span className="font-medium text-foreground truncate">{chat.name}</span>
                <span className="text-xs text-muted-foreground">{chat.time}</span>
              </div>
              <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
            </div>

            {/* Unread badge */}
            {chat.unread > 0 && (
              <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-xs font-medium text-primary-foreground">{chat.unread}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
