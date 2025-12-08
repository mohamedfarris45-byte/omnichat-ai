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
}

interface ChatViewProps {
  chatId: string;
  platform: "telegram" | "discord";
  messages: Message[];
  onSendMessage: (message: string) => void;
  onOpenAI: () => void;
}

const ChatView = ({ chatId, platform, messages, onSendMessage, onOpenAI }: ChatViewProps) => {
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
              <span className="font-semibold">A</span>
            </div>
            <div
              className={cn(
                "absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full flex items-center justify-center",
                platform === "telegram" ? "bg-telegram" : "bg-discord"
              )}
            >
              {platform === "telegram" ? (
                <TelegramIcon className="w-2.5 h-2.5 text-white" />
              ) : (
                <DiscordIcon className="w-2.5 h-2.5 text-white" />
              )}
            </div>
          </div>
          <div>
            <p className="font-medium">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">Online</p>
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
            <div
              className={cn(
                "max-w-[70%] rounded-2xl px-4 py-2.5",
                msg.sender === "user"
                  ? "bg-primary text-primary-foreground rounded-br-sm"
                  : "bg-muted rounded-bl-sm"
              )}
            >
              <p className="text-sm">{msg.content}</p>
              <p
                className={cn(
                  "text-xs mt-1",
                  msg.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                )}
              >
                {msg.time}
              </p>
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
