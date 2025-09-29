import { useState } from "react";
import { Search, Filter, Download, Play, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { mockConversations } from "@/lib/mockData";
import TruncateTooltip from "@/components/TruncateTooltip";
import ExpandOnClick from "@/components/ExpandOnClick";
import LabelChips from "@/components/LabelChips";

const Conversations = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedConvs, setSelectedConvs] = useState<string[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const quickFilters = [
    { id: "policy-fail", label: "Policy: Fail", key: "policyPass", value: false },
    { id: "score-low", label: "Score < 75", key: "score", check: (s: number | null) => s !== null && s < 75 },
    { id: "need-fix", label: "Need Fix", key: "csReview", value: "need_fix" },
  ];
  
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev =>
      prev.includes(filterId) ? prev.filter(f => f !== filterId) : [...prev, filterId]
    );
  };
  
  let filteredConversations = mockConversations.filter(conv =>
    conv.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.botName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.qaAnswer.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Apply quick filters
  activeFilters.forEach(filterId => {
    const filter = quickFilters.find(f => f.id === filterId);
    if (!filter) return;
    
    if (filter.id === "policy-fail") {
      filteredConversations = filteredConversations.filter(c => !c.policyPass);
    } else if (filter.id === "score-low") {
      filteredConversations = filteredConversations.filter(c => c.score !== null && c.score < 75);
    } else if (filter.id === "need-fix") {
      filteredConversations = filteredConversations.filter(c => c.csReview === "need_fix");
    }
  });
  
  const toggleSelection = (id: string) => {
    setSelectedConvs(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    );
  };
  
  const toggleSelectAll = () => {
    if (selectedConvs.length === filteredConversations.length) {
      setSelectedConvs([]);
    } else {
      setSelectedConvs(filteredConversations.map(c => c.id));
    }
  };
  
  const getReviewBadge = (review: string | null) => {
    switch (review) {
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/20">Approved</Badge>;
      case "need_fix":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Need Fix</Badge>;
      case "to_review":
        return <Badge variant="outline">To Review</Badge>;
      default:
        return <Badge variant="secondary">—</Badge>;
    }
  };
  
  const getScoreColor = (score: number | null) => {
    if (!score) return "text-muted-foreground";
    if (score >= 85) return "text-success font-semibold";
    if (score >= 70) return "text-warning font-semibold";
    return "text-destructive font-semibold";
  };
  
  return (
    <div className="container py-6 px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Conversations</h1>
          <p className="text-muted-foreground mt-1">Analyze and evaluate bot conversations</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search conversations, text, labels..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
        
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-muted-foreground">Quick filters:</span>
          {quickFilters.map((filter) => (
            <Badge
              key={filter.id}
              variant={activeFilters.includes(filter.id) ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary/90 transition-colors"
              onClick={() => toggleFilter(filter.id)}
            >
              {filter.label}
              {activeFilters.includes(filter.id) && (
                <X className="ml-1 h-3 w-3" />
              )}
            </Badge>
          ))}
        </div>
      </div>
      
      {selectedConvs.length > 0 && (
        <div className="flex items-center gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
          <span className="text-sm font-medium">{selectedConvs.length} selected</span>
          <Button size="sm" variant="default" className="bg-gradient-primary">
            <Play className="mr-2 h-4 w-4" />
            Run Evaluation
          </Button>
          <Button size="sm" variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export to Sheets
          </Button>
        </div>
      )}
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedConvs.length === filteredConversations.length && filteredConversations.length > 0}
                  onCheckedChange={toggleSelectAll}
                />
              </TableHead>
              <TableHead className="font-semibold">Conversation</TableHead>
              <TableHead className="font-semibold">Bot</TableHead>
              <TableHead className="font-semibold">Date/Time</TableHead>
              <TableHead className="font-semibold text-center">Score</TableHead>
              <TableHead className="font-semibold">QA Answer</TableHead>
              <TableHead className="font-semibold">CS Review</TableHead>
              <TableHead className="font-semibold">Labels</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredConversations.map((conv) => (
              <TableRow
                key={conv.id}
                className="cursor-pointer hover:bg-muted/30 transition-colors"
              >
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={selectedConvs.includes(conv.id)}
                    onCheckedChange={() => toggleSelection(conv.id)}
                  />
                </TableCell>
                <TableCell className="font-mono text-sm">
                  <TruncateTooltip text={conv.id} lines={1} />
                </TableCell>
                <TableCell className="text-sm">
                  <TruncateTooltip text={conv.botName} lines={1} />
                </TableCell>
                <TableCell className="text-sm text-muted-foreground whitespace-nowrap" title={conv.date}>
                  {conv.date}
                </TableCell>
                <TableCell className="text-center">
                  <span className={`text-lg ${getScoreColor(conv.score)}`}>
                    {conv.score || "—"}
                  </span>
                </TableCell>
                <TableCell className="max-w-xs">
                  <ExpandOnClick 
                    preview={conv.qaAnswer} 
                    full={conv.qaAnswer}
                    lines={2}
                  />
                </TableCell>
                <TableCell>
                  {getReviewBadge(conv.csReview)}
                </TableCell>
                <TableCell>
                  <LabelChips labels={conv.labels} max={2} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      
      {filteredConversations.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground">No conversations found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Conversations;
