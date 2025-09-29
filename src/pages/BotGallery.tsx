import { useState } from "react";
import { Search, Filter, MessageSquare, TrendingUp, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockBots } from "@/lib/mockData";

const BotGallery = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredBots = mockBots.filter(bot =>
    bot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bot.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-success/10 text-success border-success/20";
      case "inactive": return "bg-muted text-muted-foreground";
      case "testing": return "bg-warning/10 text-warning border-warning/20";
      default: return "bg-muted text-muted-foreground";
    }
  };
  
  const getPassRateColor = (rate: number | null) => {
    if (!rate) return "text-muted-foreground";
    if (rate >= 85) return "text-success";
    if (rate >= 70) return "text-warning";
    return "text-destructive";
  };
  
  return (
    <div className="container py-6 px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Bot Gallery</h1>
          <p className="text-muted-foreground mt-1">Manage and evaluate your conversation bots</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search bot name, ID, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        
        <Button variant="outline" size="default">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBots.map((bot) => (
          <Card key={bot.id} className="group hover:shadow-lg transition-all duration-300 border-border hover:border-primary/30">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="space-y-1 flex-1">
                  <h3 className="font-semibold text-lg leading-tight">{bot.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono">ID: {bot.id}</p>
                </div>
                <Badge className={getStatusColor(bot.status)} variant="outline">
                  {bot.status}
                </Badge>
              </div>
              
              <div className="flex flex-wrap gap-1.5">
                {bot.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3 pb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Last QA:</span>
                <span className="font-medium">{bot.lastQA || "—"}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Pass rate:</span>
                <span className={`font-semibold ${getPassRateColor(bot.passRate)}`}>
                  {bot.passRate ? `${bot.passRate}%` : "n/a"}
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <MessageSquare className="h-4 w-4 text-muted-foreground" />
                <span className="text-muted-foreground">Conversations:</span>
                <span className="font-medium">{bot.convCount.toLocaleString()}</span>
              </div>
            </CardContent>
            
            <CardFooter className="flex gap-2 pt-4 border-t">
              <Link to={`/conversations?bot=${bot.id}`} className="flex-1">
                <Button variant="outline" className="w-full">
                  View Conversations
                </Button>
              </Link>
              <Button variant="default" className="flex-1 bg-gradient-primary hover:opacity-90">
                Run Evaluation
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {filteredBots.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No bots found matching your search.</p>
        </div>
      )}
    </div>
  );
};

export default BotGallery;
