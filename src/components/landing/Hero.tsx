import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TelegramIcon, DiscordIcon, AISparkleIcon } from "@/components/icons/PlatformIcons";
import { ArrowRight, MessageSquare, Sparkles, Zap } from "lucide-react";

const Hero = () => {
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-muted/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />

      <div className="container relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8 animate-fade-in">
            <AISparkleIcon className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">AI-Powered Unified Messaging</span>
          </div>

          {/* Main heading */}
          <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            All Your Chats,{" "}
            <span className="text-gradient">One Platform</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Unify Telegram and Discord conversations with intelligent AI that analyzes, summarizes, and helps you respond smarter.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" onClick={() => navigate("/auth")}>
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
          </div>

          {/* Platform badges */}
          <div className="flex items-center justify-center gap-6 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-telegram/10 border border-telegram/20">
              <TelegramIcon className="w-5 h-5 text-telegram" />
              <span className="text-sm font-medium">Telegram</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-discord/10 border border-discord/20">
              <DiscordIcon className="w-5 h-5 text-discord" />
              <span className="text-sm font-medium">Discord</span>
            </div>
          </div>
        </div>

        {/* Feature cards preview */}
        <div className="mt-20 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { icon: MessageSquare, title: "Unified Inbox", desc: "All messages in one place" },
            { icon: Sparkles, title: "AI Analysis", desc: "Smart message insights" },
            { icon: Zap, title: "Quick Responses", desc: "AI-generated replies" },
          ].map((feature, i) => (
            <div
              key={feature.title}
              className="glass rounded-2xl p-6 hover:glow-primary transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${0.5 + i * 0.1}s` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
