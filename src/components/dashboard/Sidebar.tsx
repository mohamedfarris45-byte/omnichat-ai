import React from "react";
import { cn } from "@/lib/utils";
import { TelegramIcon, DiscordIcon, AISparkleIcon } from "@/components/icons/PlatformIcons";
import { Home, MessageSquare, Settings, Users, Brain } from "lucide-react";
import { Link } from "react-router-dom";

interface SidebarProps {
  activePlatform: "telegram" | "discord" | "all";
  onPlatformChange: (platform: "telegram" | "discord" | "all") => void;
}

const Sidebar = ({ activePlatform, onPlatformChange }: SidebarProps) => {
  const navItems = [
    { icon: Home, label: "Overview", href: "/dashboard" },
    { icon: MessageSquare, label: "All Chats", href: "/dashboard" },
    { icon: Brain, label: "AI Insights", href: "/dashboard" },
    { icon: Users, label: "Contacts", href: "/dashboard" },
    { icon: Settings, label: "Settings", href: "/dashboard" },
  ];

  return (
    <aside className="w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <AISparkleIcon className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display text-xl font-bold text-sidebar-foreground">UniChat</span>
        </Link>
      </div>

      {/* Platform Selector */}
      <div className="p-4 border-b border-sidebar-border">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Platforms</p>
        <div className="flex flex-col gap-2">
          <button
            onClick={() => onPlatformChange("all")}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
              activePlatform === "all"
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <MessageSquare className="w-5 h-5" />
            <span className="text-sm font-medium">All Messages</span>
          </button>
          <button
            onClick={() => onPlatformChange("telegram")}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
              activePlatform === "telegram"
                ? "bg-telegram/20 text-telegram border border-telegram/30"
                : "text-muted-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <TelegramIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Telegram</span>
          </button>
          <button
            onClick={() => onPlatformChange("discord")}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all",
              activePlatform === "discord"
                ? "bg-discord/20 text-discord border border-discord/30"
                : "text-muted-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <DiscordIcon className="w-5 h-5" />
            <span className="text-sm font-medium">Discord</span>
          </button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Menu</p>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-all"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
            <span className="text-sm font-semibold text-primary-foreground">U</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate">User Name</p>
            <p className="text-xs text-muted-foreground truncate">user@email.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
