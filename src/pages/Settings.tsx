import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { ExternalLink, Link as LinkIcon } from "lucide-react";

const Settings = () => {
  return (
    <div className="container py-6 px-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground mt-1">Configure integrations and permissions</p>
      </div>
      
      <div className="space-y-6 max-w-3xl">
        <Card>
          <CardHeader>
            <CardTitle>Google Sheets Integration</CardTitle>
            <CardDescription>
              Export conversation data directly to Google Sheets for reporting and analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <LinkIcon className="h-5 w-5 text-success" />
                </div>
                <div>
                  <p className="font-medium">Connected Account</p>
                  <p className="text-sm text-muted-foreground">workspace@example.com</p>
                </div>
              </div>
              <Button variant="outline">
                Disconnect
              </Button>
            </div>
            
            <div className="space-y-2">
              <Label>Default Export Settings</Label>
              <div className="space-y-3 p-4 bg-muted/30 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include timestamps</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include labels</span>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Include QA answers</span>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>User Permissions</CardTitle>
            <CardDescription>
              Control who can modify prompts, rules, and run evaluations
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { role: "Admin", canEdit: true, canRun: true, canExport: true },
              { role: "QA Lead", canEdit: true, canRun: true, canExport: true },
              { role: "QA Member", canEdit: false, canRun: true, canExport: true },
              { role: "Viewer", canEdit: false, canRun: false, canExport: false }
            ].map((perm) => (
              <div key={perm.role} className="flex items-center justify-between p-4 border rounded-lg">
                <span className="font-medium">{perm.role}</span>
                <div className="flex gap-6 text-sm">
                  <span className={perm.canEdit ? "text-success" : "text-muted-foreground"}>
                    Edit Rules: {perm.canEdit ? "✓" : "✗"}
                  </span>
                  <span className={perm.canRun ? "text-success" : "text-muted-foreground"}>
                    Run Eval: {perm.canRun ? "✓" : "✗"}
                  </span>
                  <span className={perm.canExport ? "text-success" : "text-muted-foreground"}>
                    Export: {perm.canExport ? "✓" : "✗"}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Version History</CardTitle>
            <CardDescription>
              Track changes to prompts and rules over time
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Full History
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
