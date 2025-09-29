import { useState } from "react";
import { Play, Pause, Copy, ExternalLink, MessageSquare, Download } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Conversation } from "@/lib/mockData";
import LabelChips from "./LabelChips";

interface ConversationDrawerProps {
  conversation: Conversation | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ConversationDrawer = ({ conversation, open, onOpenChange }: ConversationDrawerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [csReview, setCsReview] = useState(conversation?.csReview || "");
  const [audioTime, setAudioTime] = useState(0);

  if (!conversation) return null;

  // Mock chat transcript
  const transcript = [
    { role: "user", text: "Xin chào, tôi muốn hỏi về sản phẩm bảo hiểm xe ô tô.", time: "00:00" },
    { role: "bot", text: "Chào bạn! Tôi là trợ lý ảo của BIVA. Bạn đang quan tâm đến loại xe nào ạ?", time: "00:03" },
    { role: "user", text: "Xe con 5 chỗ, Honda City 2023.", time: "00:12" },
    { role: "bot", text: "Vâng ạ. Để tư vấn chính xác, bạn vui lòng cho tôi xin CMND/CCCD được không?", time: "00:15" },
    { role: "user", text: "079... [PII masked]", time: "00:25" },
    { role: "bot", text: "Cảm ơn bạn. Gói TNDS + Vật chất xe với mức giá 3.2 triệu/năm. Bạn có muốn thêm...", time: "00:28" },
  ];

  // Mock audio violations markers
  const violations = [
    { time: 15, type: "Missing Auth", color: "destructive" },
    { time: 25, type: "PII Exposure", color: "warning" },
  ];

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  const handleRunEval = () => {
    toast.success("Running evaluation...");
  };

  const handleCreateTicket = () => {
    toast.success("Creating ticket...");
  };

  const handleExport = () => {
    toast.success("Exporting to Google Sheets...");
  };

  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 85) return "text-success";
    if (score >= 70) return "text-warning";
    return "text-destructive";
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="max-h-[90vh]">
        <div className="mx-auto w-full max-w-6xl overflow-y-auto">
          <DrawerHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-1">
                <DrawerTitle className="text-2xl font-bold">
                  Conversation {conversation.id}
                </DrawerTitle>
                <DrawerDescription className="flex items-center gap-2 text-sm">
                  <span>Bot: {conversation.botName}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{conversation.date}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span className={`font-semibold ${getScoreColor(conversation.score)}`}>
                    Score: {conversation.score || "—"}
                  </span>
                </DrawerDescription>
              </div>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleRunEval} className="bg-gradient-primary">
                  Run Eval
                </Button>
                <Button size="sm" variant="outline" onClick={handleCreateTicket}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Create Ticket
                </Button>
                <Button size="sm" variant="outline" onClick={handleExport}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </DrawerHeader>

          <div className="px-6 pb-6 space-y-6">
            {/* Audio Player Section */}
            <section className="space-y-3">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Audio Recording
              </h3>
              <div className="bg-muted/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center gap-4">
                  <Button
                    size="icon"
                    variant="outline"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-10 w-10 rounded-full"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <div className="flex-1">
                    <div className="relative h-2 bg-muted rounded-full">
                      <div
                        className="absolute h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(audioTime / 180) * 100}%` }}
                      />
                      {violations.map((v, i) => (
                        <div
                          key={i}
                          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-${v.color} border-2 border-background cursor-pointer`}
                          style={{ left: `${(v.time / 180) * 100}%` }}
                          title={v.type}
                        />
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">
                    {Math.floor(audioTime / 60)}:{(audioTime % 60).toString().padStart(2, "0")} / 3:00
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {violations.map((v, i) => (
                    <Badge key={i} variant="outline" className="text-xs">
                      {v.time}s - {v.type}
                    </Badge>
                  ))}
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Chat Transcript */}
              <section className="space-y-3">
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Chat Transcript
                </h3>
                <div className="border rounded-lg p-4 space-y-3 max-h-96 overflow-y-auto bg-background">
                  {transcript.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex gap-3 ${msg.role === "bot" ? "flex-row" : "flex-row-reverse"}`}
                    >
                      <div
                        className={`flex-1 rounded-lg p-3 ${
                          msg.role === "bot"
                            ? "bg-muted/50"
                            : "bg-primary/10 border border-primary/20"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold uppercase text-muted-foreground">
                            {msg.role === "bot" ? "Bot" : "User"}
                          </span>
                          <span className="text-xs text-muted-foreground">{msg.time}</span>
                        </div>
                        <p className="text-sm">{msg.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* QA Answer & CS Review */}
              <section className="space-y-6">
                {/* QA Answer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                      QA Answer
                    </h3>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleCopy(conversation.qaAnswer, "QA Answer")}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="border rounded-lg p-4 bg-background">
                    <p className="text-sm whitespace-pre-wrap">{conversation.qaAnswer}</p>
                  </div>
                </div>

                {/* CS Review */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    CS Review
                  </h3>
                  <div className="space-y-2">
                    <Textarea
                      value={csReview || ""}
                      onChange={(e) => setCsReview(e.target.value)}
                      placeholder="Add your review notes..."
                      className="min-h-[100px] resize-none"
                    />
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="bg-success/10 text-success border-success/20">
                          Approve
                        </Button>
                        <Button size="sm" variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          Need Fix
                        </Button>
                      </div>
                      <Button size="sm" onClick={() => toast.success("Review saved")}>
                        Save Review
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Labels */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Labels
                  </h3>
                  <LabelChips labels={conversation.labels} max={5} />
                </div>

                {/* Policy Status */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                    Policy Check
                  </h3>
                  <Badge
                    variant={conversation.policyPass ? "outline" : "destructive"}
                    className={conversation.policyPass ? "bg-success/10 text-success border-success/20" : ""}
                  >
                    {conversation.policyPass ? "✓ Passed" : "✗ Failed"}
                  </Badge>
                </div>
              </section>
            </div>
          </div>

          <DrawerFooter>
            <div className="flex justify-between items-center">
              <div className="text-xs text-muted-foreground">
                Press <kbd className="px-2 py-1 bg-muted rounded text-xs">Esc</kbd> to close
              </div>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ConversationDrawer;
