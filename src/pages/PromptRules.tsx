import { useState } from "react";
import { Save, RotateCcw, Eye, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const PromptRules = () => {
  const [useCustomPrompt, setUseCustomPrompt] = useState(false);
  
  const defaultPrompt = `name: EVAL_PROMPT_v1
system: |
  Bạn là QA đánh giá cuộc hội thoại bot-khách. Tuyệt đối không bịa.
  Chấm theo rubric tóm tắt, ưu tiên câu chữ ngắn gọn, hữu ích cho Sale.
  
context:
  bot_system_prompt: "{{BOT_SYSTEM_PROMPT}}"
  kb_snippets: {{KB_SNIPPETS}}
  
input:
  conversation_text: {{CONVERSATION_TEXT}}
  
rubric:
  - policy: greeting/auth/PII/end
  - score_aspects: intent, slots, flow, solution, tone
  
output_json:
  score_total: 0..100
  policy_pass: true|false
  qa_answer: short # 1-2 câu, có giá trị cho Sale
  labels: ["ASR","NLU","KB","Rule","UX"]
  cs_recommend: short`;

  const [customPrompt, setCustomPrompt] = useState(defaultPrompt);
  
  return (
    <div className="container py-6 px-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Prompt & Rules</h1>
          <p className="text-muted-foreground mt-1">Manage evaluation templates and policies</p>
        </div>
        
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button className="bg-gradient-primary">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="prompt" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="prompt">Prompt Template</TabsTrigger>
          <TabsTrigger value="rules">Global Rules</TabsTrigger>
          <TabsTrigger value="overrides">User Overrides</TabsTrigger>
        </TabsList>
        
        <TabsContent value="prompt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Default Evaluation Prompt</CardTitle>
              <CardDescription>
                This template is applied to all bot evaluations. Use variables like {`{{BOT_SYSTEM_PROMPT}}`} and {`{{CONVERSATION_TEXT}}`} to inject context.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Prompt Template (YAML)</Label>
                <Textarea
                  value={defaultPrompt}
                  className="min-h-[400px] font-mono text-sm"
                  readOnly
                />
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                <Code className="h-5 w-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm font-medium">Template Variables Available</p>
                  <p className="text-sm text-muted-foreground">
                    {`{{BOT_SYSTEM_PROMPT}}`}, {`{{KB_SNIPPETS}}`}, {`{{CONVERSATION_TEXT}}`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="rules" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Global Evaluation Rules</CardTitle>
              <CardDescription>
                These rules apply to all users and all bots. Define policy checks and validation logic.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                {[
                  { id: "greeting", label: "Greeting Required", description: "Bot must greet user at conversation start" },
                  { id: "auth", label: "Authentication Check", description: "Verify user identity before sensitive operations" },
                  { id: "pii", label: "PII Masking", description: "Personal information must be masked in logs" },
                  { id: "endcall", label: "Proper End Call", description: "Conversation must end with appropriate closing" }
                ].map((rule) => (
                  <div key={rule.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="space-y-1 flex-1">
                      <Label className="text-base font-medium">{rule.label}</Label>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="overrides" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User-Specific Overrides</CardTitle>
              <CardDescription>
                Advanced users can customize their own evaluation prompt. Changes only affect evaluations run by this user.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <Label className="text-base font-medium">Use Custom Prompt</Label>
                  <p className="text-sm text-muted-foreground">
                    Enable to override the default template with your own
                  </p>
                </div>
                <Switch
                  checked={useCustomPrompt}
                  onCheckedChange={setUseCustomPrompt}
                />
              </div>
              
              {useCustomPrompt && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Your Custom Prompt</Label>
                    <Button variant="ghost" size="sm" onClick={() => setCustomPrompt(defaultPrompt)}>
                      <RotateCcw className="mr-2 h-4 w-4" />
                      Reset to Default
                    </Button>
                  </div>
                  <Textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="min-h-[400px] font-mono text-sm"
                    placeholder="Enter your custom evaluation prompt..."
                  />
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Owner: You</span>
                    <span>•</span>
                    <span>Last updated: 2025-09-29</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PromptRules;
