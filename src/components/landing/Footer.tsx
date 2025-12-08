import React from "react";
import { AISparkleIcon, TelegramIcon, DiscordIcon } from "@/components/icons/PlatformIcons";

const Footer = () => {
  return (
    <footer className="border-t border-border/50 py-12 bg-muted/10">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
              <AISparkleIcon className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">UniChat</span>
          </div>

          {/* Platforms */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-muted-foreground">
              <TelegramIcon className="w-4 h-4" />
              <span className="text-sm">Telegram</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <DiscordIcon className="w-4 h-4" />
              <span className="text-sm">Discord</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2024 UniChat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
