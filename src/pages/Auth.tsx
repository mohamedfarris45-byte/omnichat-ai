import React from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TelegramIcon, DiscordIcon } from "@/components/icons/PlatformIcons";
import { MessageSquare } from "lucide-react";

const Auth = () => {
  const navigate = useNavigate();

  const handleTelegramLogin = () => {
    // Mock login - in real app would redirect to Telegram OAuth
    navigate("/dashboard");
  };

  const handleDiscordLogin = () => {
    // Mock login - in real app would redirect to Discord OAuth
    navigate("/dashboard");
  };

  return (
    <>
      <Helmet>
        <title>Sign In - UniChat</title>
        <meta name="description" content="Connect your Telegram and Discord accounts to UniChat." />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary mb-4">
              <MessageSquare className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-display font-bold">UniChat</h1>
            <p className="text-muted-foreground mt-2">Connect your accounts to get started</p>
          </div>

          {/* Login Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleTelegramLogin}
              className="w-full flex items-center justify-center gap-4 p-5 rounded-2xl bg-telegram/10 hover:bg-telegram/20 border-2 border-telegram/30 hover:border-telegram transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-telegram flex items-center justify-center group-hover:scale-105 transition-transform">
                <TelegramIcon className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-lg">Continue with Telegram</p>
                <p className="text-sm text-muted-foreground">Sync your Telegram chats</p>
              </div>
            </button>

            <button
              onClick={handleDiscordLogin}
              className="w-full flex items-center justify-center gap-4 p-5 rounded-2xl bg-discord/10 hover:bg-discord/20 border-2 border-discord/30 hover:border-discord transition-all group"
            >
              <div className="w-12 h-12 rounded-xl bg-discord flex items-center justify-center group-hover:scale-105 transition-transform">
                <DiscordIcon className="w-7 h-7 text-white" />
              </div>
              <div className="text-left flex-1">
                <p className="font-semibold text-lg">Continue with Discord</p>
                <p className="text-sm text-muted-foreground">Sync your Discord messages</p>
              </div>
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-border"></div>
            <span className="text-sm text-muted-foreground">or connect both</span>
            <div className="flex-1 h-px bg-border"></div>
          </div>

          {/* Connect All */}
          <Button
            variant="hero"
            className="w-full h-14 text-lg"
            onClick={() => navigate("/dashboard")}
          >
            <TelegramIcon className="w-5 h-5" />
            <DiscordIcon className="w-5 h-5" />
            Connect All Platforms
          </Button>

          {/* Footer */}
          <p className="text-center text-xs text-muted-foreground mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </>
  );
};

export default Auth;