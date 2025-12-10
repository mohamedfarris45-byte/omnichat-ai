import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { TelegramIcon, DiscordIcon, AISparkleIcon } from "@/components/icons/PlatformIcons";
import { Button } from "@/components/ui/button";
import { Send, Paperclip, Smile, MoreVertical, Phone, Video, X, Reply } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  time: string;
  platform: "telegram" | "discord";
  senderName?: string;
}

interface ChatViewProps {
  chatName: string;
  messages: Message[];
  onSendMessage: (message: string, replyTo?: Message) => void;
  onOpenAI: () => void;
}

const ChatView = ({ chatName, messages, onSendMessage, onOpenAI }: ChatViewProps) => {
  const [inputValue, setInputValue] = useState("");
  const [replyingTo, setReplyingTo] = useState<Message | null>(null);

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue, replyingTo || undefined);
      setInputValue("");
      setReplyingTo(null);
    }
  };

  const handleMessageClick = (message: Message) => {
    if (message.sender === "other") {
      setReplyingTo(message);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header */}
      <div className="h-16 px-4 border-b border-border flex items-center justify-between bg-card/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <span className="font-semibold">{chatName[0]}</span>
            </div>
          </div>
          <div>
            <p className="font-medium">{chatName}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TelegramIcon className="w-3 h-3 text-telegram" />
              <DiscordIcon className="w-3 h-3 text-discord" />
              <span>Unified Chat</span>
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
            <div 
              className={cn(
                "flex items-end gap-2 max-w-[70%]",
                msg.sender === "other" && "cursor-pointer group"
              )}
              onClick={() => handleMessageClick(msg)}
            >
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
              <div className="relative">
                {/* Reply indicator on hover */}
                {msg.sender === "other" && (
                  <div className="absolute -right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Reply className="w-4 h-4 text-muted-foreground" />
                  </div>
                )}
                <div
                  className={cn(
                    "rounded-2xl px-4 py-2.5 transition-all",
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm group-hover:bg-muted/80 group-hover:ring-2 group-hover:ring-primary/30"
                  )}
                >
                  {msg.senderName && msg.sender === "other" && (
                    <p className="text-xs font-medium text-primary mb-1">{msg.senderName}</p>
                  )}
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

      {/* Reply Preview */}
      {replyingTo && (
        <div className="px-4 py-2 bg-muted/50 border-t border-border flex items-center gap-3">
          <div className="w-1 h-10 rounded-full bg-primary"></div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-primary">
              Replying to {replyingTo.senderName || "message"}
            </p>
            <p className="text-sm text-muted-foreground truncate">{replyingTo.content}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setReplyingTo(null)}>
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}

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
              placeholder={replyingTo ? "Type your reply..." : "Type a message..."}
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