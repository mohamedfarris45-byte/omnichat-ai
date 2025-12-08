import React from "react";
import { cn } from "@/lib/utils";
import { TelegramIcon, DiscordIcon, AISparkleIcon } from "@/components/icons/PlatformIcons";
import { Home, Brain, Settings, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Brain, label: "AI Insights", href: "/dashboard" },
    { icon: Settings, label: "Settings", href: "/dashboard" },
    { icon: HelpCircle, label: "Help", href: "/dashboard" },
  ];

  return (
    <aside className="w-20 h-screen bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4">
      {/* Logo */}
      <Link to="/" className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
          <AISparkleIcon className="w-6 h-6 text-primary-foreground" />
        </div>
      </Link>

      {/* Platform Icons */}
      <div className="flex flex-col gap-3 mb-8">
        <div className="w-12 h-12 rounded-xl bg-telegram/10 flex items-center justify-center border border-telegram/20 hover:bg-telegram/20 transition-colors cursor-pointer">
          <TelegramIcon className="w-6 h-6 text-telegram" />
        </div>
        <div className="w-12 h-12 rounded-xl bg-discord/10 flex items-center justify-center border border-discord/20 hover:bg-discord/20 transition-colors cursor-pointer">
          <DiscordIcon className="w-6 h-6 text-discord" />
        </div>
      </div>

      {/* Separator */}
      <div className="w-8 h-px bg-border mb-6" />

      {/* Navigation */}
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.href}
            className="w-12 h-12 rounded-xl flex items-center justify-center text-muted-foreground hover:bg-accent hover:text-foreground transition-all group relative"
            title={item.label}
          >
            <item.icon className="w-5 h-5" />
            <span className="absolute left-full ml-3 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </Link>
        ))}
      </nav>

      {/* User Avatar */}
      <div className="mt-auto">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center cursor-pointer hover:scale-105 transition-transform">
          <span className="text-sm font-semibold text-primary-foreground">U</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
