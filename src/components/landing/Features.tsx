import React from "react";
import { TelegramIcon, DiscordIcon, AISparkleIcon } from "@/components/icons/PlatformIcons";
import { Brain, FileText, MessageSquarePlus, Shield, Zap, Globe } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Message Analysis",
    description: "Understand sentiment, detect urgency, and get contextual insights from your conversations automatically.",
    gradient: "from-primary to-primary/50",
  },
  {
    icon: FileText,
    title: "Smart Summarization",
    description: "Get instant summaries of long conversations. Never miss important details even after being away.",
    gradient: "from-secondary to-secondary/50",
  },
  {
    icon: MessageSquarePlus,
    title: "AI Response Generation",
    description: "Generate contextually appropriate responses with AI. Customize tone and style to match your voice.",
    gradient: "from-primary to-secondary",
  },
  {
    icon: Globe,
    title: "Unified Experience",
    description: "Seamlessly switch between Telegram and Discord without losing context or conversation history.",
    gradient: "from-telegram to-primary",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "End-to-end encryption and local processing options keep your conversations private and secure.",
    gradient: "from-discord to-secondary",
  },
  {
    icon: Zap,
    title: "Real-time Sync",
    description: "Instant message delivery and synchronization across all your connected platforms.",
    gradient: "from-primary to-telegram",
  },
];

const Features = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-muted/20 via-background to-background" />
      
      <div className="container relative z-10 px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
            <AISparkleIcon className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Powerful Features</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Chat Smarter</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful AI tools combined with seamless platform integration
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, i) => (
            <div
              key={feature.title}
              className="group glass rounded-2xl p-6 hover:border-primary/50 transition-all duration-500 cursor-default"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} p-[1px] mb-5`}>
                <div className="w-full h-full rounded-xl bg-card flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Platform integration visual */}
        <div className="mt-20 flex items-center justify-center gap-8">
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <TelegramIcon className="w-8 h-8 text-telegram" />
            <span className="text-lg font-medium">Telegram</span>
          </div>
          <div className="w-16 h-[2px] bg-gradient-to-r from-telegram via-primary to-discord rounded-full" />
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-primary">
            <AISparkleIcon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="w-16 h-[2px] bg-gradient-to-r from-discord via-secondary to-primary rounded-full" />
          <div className="flex items-center gap-3 opacity-60 hover:opacity-100 transition-opacity">
            <DiscordIcon className="w-8 h-8 text-discord" />
            <span className="text-lg font-medium">Discord</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
