import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { AISparkleIcon } from "@/components/icons/PlatformIcons";
import { X, FileText, MessageSquarePlus, Brain, Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

interface AIPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerateMessage: (message: string) => void;
}

type AIMode = "analyze" | "summarize" | "generate";

const AIPanel = ({ isOpen, onClose, onGenerateMessage }: AIPanelProps) => {
  const [mode, setMode] = useState<AIMode>("analyze");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const modes = [
    { id: "analyze" as AIMode, icon: Brain, label: "Analyze" },
    { id: "summarize" as AIMode, icon: FileText, label: "Summarize" },
    { id: "generate" as AIMode, icon: MessageSquarePlus, label: "Generate" },
  ];

  const handleProcess = () => {
    setIsProcessing(true);
    // Simulate AI processing
    setTimeout(() => {
      if (mode === "analyze") {
        setResult(
          "**Sentiment Analysis:** Positive (85%)\n\n**Key Topics:**\n- Project updates\n- Meeting scheduling\n- Deadline discussion\n\n**Urgency Level:** Medium\n\nThe conversation shows collaborative tone with focus on upcoming deliverables."
        );
      } else if (mode === "summarize") {
        setResult(
          "**Conversation Summary:**\n\nAlex discussed the project timeline and requested a meeting next week. The main points were:\n\n1. Phase 1 completion expected by Friday\n2. Need to review design mockups\n3. Budget approval pending\n\nAction items: Schedule review meeting, prepare presentation."
        );
      } else {
        setResult(
          "Here are 3 suggested responses:\n\n**Professional:**\n\"Thanks for the update! I'll review the documents and get back to you by EOD tomorrow.\"\n\n**Casual:**\n\"Sounds good! Let me take a look and we can sync up later.\"\n\n**Detailed:**\n\"I appreciate you sharing this. I'll thoroughly review the materials and prepare my feedback for our next meeting.\""
        );
      }
      setIsProcessing(false);
    }, 1500);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-96 h-full bg-card border-l border-border flex flex-col animate-slide-in-left">
      {/* Header */}
      <div className="h-16 px-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center glow-ai">
            <AISparkleIcon className="w-4 h-4 text-primary-foreground" />
          </div>
          <span className="font-display font-semibold">AI Assistant</span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Mode Selector */}
      <div className="p-4 border-b border-border">
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setResult(null);
              }}
              className={cn(
                "flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                mode === m.id
                  ? "bg-gradient-to-r from-primary to-secondary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              <m.icon className="w-4 h-4" />
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {!result ? (
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <p className="text-sm text-muted-foreground mb-3">
                {mode === "analyze" && "Analyze the current conversation for sentiment, topics, and insights."}
                {mode === "summarize" && "Get a concise summary of the conversation with key points and action items."}
                {mode === "generate" && "Generate contextual response suggestions based on the conversation."}
              </p>
              <Button
                variant="hero"
                className="w-full"
                onClick={handleProcess}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <AISparkleIcon className="w-4 h-4" />
                    {mode === "analyze" && "Analyze Conversation"}
                    {mode === "summarize" && "Summarize Messages"}
                    {mode === "generate" && "Generate Responses"}
                  </>
                )}
              </Button>
            </div>

            {/* Tips */}
            <div className="space-y-2">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Tips</p>
              <div className="text-sm text-muted-foreground space-y-1">
                <p>• Select messages to focus the analysis</p>
                <p>• Use keyboard shortcuts for quick access</p>
                <p>• Generated responses can be customized</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="glass rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">Result</span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              <div className="text-sm whitespace-pre-wrap">{result}</div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setResult(null)}
              >
                <RefreshCw className="w-4 h-4" />
                Retry
              </Button>
              {mode === "generate" && (
                <Button
                  variant="default"
                  className="flex-1"
                  onClick={() => onGenerateMessage("Thanks for the update! I'll review and get back to you.")}
                >
                  Use Response
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPanel;
