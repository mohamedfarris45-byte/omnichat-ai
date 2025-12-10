import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TelegramIcon, DiscordIcon, AISparkleIcon } from "@/components/icons/PlatformIcons";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile, MoreVertical, Phone, Video } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  time: string;
  platform: "telegram" | "discord";
}

interface ChatViewProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  onOpenAI: () => void;
}

const ChatView = ({ messages, onSendMessage, onOpenAI }: ChatViewProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="font-semibold">All</span>
            </div>
          </div>
          <div>
            <p className="font-medium">Unified Chat</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TelegramIcon className="w-3 h-3 text-telegram" />
              <DiscordIcon className="w-3 h-3 text-discord" />
              <span>All platforms</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={cn(
              "flex",
              msg.sender === "user" ? "justify-end" : "justify-start"
            )}
          >
            <div className="flex items-end gap-2 max-w-[70%]">
              {msg.sender === "other" && (
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.platform === "telegram" ? "bg-telegram" : "bg-discord"
                  )}
                >
                  {msg.platform === "telegram" ? (
                    <TelegramIcon className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <DiscordIcon className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              )}
              <div
                className={cn(
                  "rounded-2xl px-4 py-2.5",
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground rounded-br-sm"
                    : "bg-muted rounded-bl-sm"
                )}
              >
                <p className="text-sm">{msg.content}</p>
                <div className={cn(
                  "flex items-center gap-1.5 mt-1",
                  msg.sender === "user" ? "justify-end" : "justify-start"
                )}>
                  {msg.sender === "other" && (
                    <span className="text-xs font-medium capitalize text-muted-foreground">
                      {msg.platform}
                    </span>
                  )}
                  <p
                    className={cn(
                      "text-xs",
                      msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {msg.time}
                  </p>
                </div>
              </div>
              {msg.sender === "user" && (
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0",
                    msg.platform === "telegram" ? "bg-telegram" : "bg-discord"
                  )}
                >
                  {msg.platform === "telegram" ? (
                    <TelegramIcon className="w-3.5 h-3.5 text-white" />
                  ) : (
                    <DiscordIcon className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon">
            <Paperclip className="w-5 h-5" />
          </Button>
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message..."
              className="w-full h-11 px-4 rounded-xl bg-muted border-0 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2">
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onOpenAI}
            className="text-secondary hover:text-secondary hover:bg-secondary/10"
          >
            <AISparkleIcon className="w-5 h-5" />
          </Button>
          <Button size="icon" onClick={handleSend}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;