import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@workspace/ui/components/separator";
import { Switch } from "@workspace/ui/components/switch";
import { Key, LogOut, Shield } from "lucide-react";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@workspace/ui/components/tabs";
function ProfileSecurity() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  return (
    <Card>
      <Tabs defaultValue="password">
        <div className="flex justify-end px-4">
          {" "}
          <TabsList>
            <TabsTrigger value="password">Password</TabsTrigger>
            <TabsTrigger value="session">Session</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="password">
          {/* <Card className="shadow-sm"> */}
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>
              Manage your password and security preferences
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Password Change */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Key className="h-4 w-4" />
                <h3 className="font-medium">Change Password</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current Password</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">New Password</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input id="confirmPassword" type="password" />
              </div>

              <Button variant="outline" className="w-full">
                Update Password
              </Button>
            </div>

            <Separator />

            {/* Two-Factor Authentication */}

            <Separator />

            {/* Logout */}
            <div className="pt-4">
              <Button variant="destructive" className="w-full" size="lg">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </CardContent>
          {/* </Card> */}
        </TabsContent>
        <TabsContent value="session">
          <div className="p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-4 w-4" />
                <h3 className="font-medium">Two-Factor Authentication</h3>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium">Enable 2FA</p>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>

              {twoFactorEnabled && (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800 mb-2">
                    Two-factor authentication is enabled. Use your authenticator
                    app to generate codes.
                  </p>
                  <Button variant="outline" size="sm">
                    View Recovery Codes
                  </Button>
                </div>
              )}
            </div>

            <Separator />

            {/* Session Management */}
            <div className="space-y-4">
              <h3 className="font-medium">Session Management</h3>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Active Sessions</p>
                    <p className="text-sm text-gray-600">2 active sessions</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage Sessions
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* </Card> */}
        </TabsContent>
      </Tabs>
    </Card>
  );
}

export default ProfileSecurity;
