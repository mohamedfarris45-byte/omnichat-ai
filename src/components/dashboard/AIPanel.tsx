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
type ToneOption = "professional" | "casual" | "detailed";

const AIPanel = ({ isOpen, onClose, onGenerateMessage }: AIPanelProps) => {
  const [mode, setMode] = useState<AIMode>("generate");
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [selectedTone, setSelectedTone] = useState<ToneOption | null>(null);

  const modes = [
    { id: "analyze" as AIMode, icon: Brain, label: "Analyze" },
    { id: "summarize" as AIMode, icon: FileText, label: "Summarize" },
    { id: "generate" as AIMode, icon: MessageSquarePlus, label: "Generate" },
  ];

  const toneOptions: { id: ToneOption; label: string; description: string }[] = [
    { id: "professional", label: "Professional", description: "Formal and business-appropriate" },
    { id: "casual", label: "Casual", description: "Friendly and relaxed" },
    { id: "detailed", label: "Detailed", description: "Comprehensive and thorough" },
  ];

  const generatedResponses: Record<ToneOption, string> = {
    professional: "Thank you for the update. I will review the documents thoroughly and provide my feedback by end of business tomorrow. Please let me know if you need anything else in the meantime.",
    casual: "Sounds good! Let me take a look at those files and I'll get back to you soon. Thanks for sending them over! 👍",
    detailed: "I appreciate you sharing these materials. I'll go through each document carefully, paying particular attention to the project timeline, budget allocations, and the proposed design mockups. I expect to have comprehensive feedback ready by tomorrow afternoon, and I'll schedule a follow-up call if any clarifications are needed.",
  };

  const handleProcess = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (mode === "analyze") {
        setResult(
          "**Sentiment Analysis:** Positive (85%)\n\n**Key Topics:**\n- Project updates\n- Meeting scheduling\n- Deadline discussion\n\n**Urgency Level:** Medium\n\nThe conversation shows collaborative tone with focus on upcoming deliverables."
        );
      } else if (mode === "summarize") {
        setResult(
          "**Conversation Summary:**\n\nAlex discussed the project timeline and requested a meeting next week. The main points were:\n\n1. Phase 1 completion expected by Friday\n2. Need to review design mockups\n3. Budget approval pending\n\nAction items: Schedule review meeting, prepare presentation."
        );
      }
      setIsProcessing(false);
    }, 1500);
  };

  const handleToneSelect = (tone: ToneOption) => {
    setSelectedTone(tone);
    setIsProcessing(true);
    setTimeout(() => {
      setResult(generatedResponses[tone]);
      setIsProcessing(false);
    }, 800);
  };

  const handleCopy = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleUseResponse = () => {
    if (result) {
      onGenerateMessage(result);
    }
  };

  const handleReset = () => {
    setResult(null);
    setSelectedTone(null);
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
                handleReset();
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
        {mode === "generate" ? (
          <div className="space-y-4">
            {!result ? (
              <>
                <p className="text-sm text-muted-foreground mb-4">
                  Choose a tone for your AI-generated response:
                </p>
                <div className="space-y-3">
                  {toneOptions.map((tone) => (
                    <button
                      key={tone.id}
                      onClick={() => handleToneSelect(tone.id)}
                      disabled={isProcessing}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all",
                        selectedTone === tone.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50 bg-muted/50",
                        isProcessing && "opacity-50 cursor-not-allowed"
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{tone.label}</span>
                        {isProcessing && selectedTone === tone.id && (
                          <RefreshCw className="w-4 h-4 animate-spin text-primary" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{tone.description}</p>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium capitalize">{selectedTone} Response</span>
                    <Button variant="ghost" size="sm" onClick={handleCopy}>
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="text-sm whitespace-pre-wrap">{result}</div>
                </div>
                
                {/* Tone Quick Switch */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Try another tone</p>
                  <div className="flex gap-2">
                    {toneOptions.map((tone) => (
                      <Button
                        key={tone.id}
                        variant={selectedTone === tone.id ? "default" : "outline"}
                        size="sm"
                        onClick={() => handleToneSelect(tone.id)}
                        disabled={isProcessing}
                        className="flex-1"
                      >
                        {tone.label}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={handleReset}
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </Button>
                  <Button
                    variant="default"
                    className="flex-1"
                    onClick={handleUseResponse}
                  >
                    Use Response
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Analyze & Summarize modes */
          <div className="space-y-4">
            {!result ? (
              <div className="space-y-4">
                <div className="glass rounded-xl p-4">
                  <p className="text-sm text-muted-foreground mb-3">
                    {mode === "analyze" && "Analyze the current conversation for sentiment, topics, and insights."}
                    {mode === "summarize" && "Get a concise summary of the conversation with key points and action items."}
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
                      </>
                    )}
                  </Button>
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
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleReset}
                >
                  <RefreshCw className="w-4 h-4" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIPanel;