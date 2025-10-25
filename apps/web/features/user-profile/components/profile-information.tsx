import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Briefcase, Calendar, Camera, IdCard, Mail, User } from "lucide-react";
import React, { useState } from "react";

function ProfileInformation() {
  const [profileImage, setProfileImage] = useState(
    "/placeholder.svg?height=120&width=120"
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <User className="h-5 w-5" />
          Profile Information
        </CardTitle>
        <CardDescription>
          Your personal and professional details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Profile Picture */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={profileImage || "/placeholder.svg"}
                alt="Profile picture"
              />
              <AvatarFallback className="text-lg">JD</AvatarFallback>
            </Avatar>
            <label
              htmlFor="profile-upload"
              className="absolute -bottom-2 -right-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-2 cursor-pointer transition-colors"
            >
              <Camera className="h-4 w-4" />
            </label>
            <input
              id="profile-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => document.getElementById("profile-upload")?.click()}
          >
            Change Photo
          </Button>
        </div>

        <Separator />

        {/* Personal Information */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              First Name
            </Label>
            <Input id="firstName" defaultValue="John" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" defaultValue="Doe" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Email Address
          </Label>
          <Input id="email" type="email" defaultValue="john.doe@company.com" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="employeeId" className="flex items-center gap-2">
              <IdCard className="h-4 w-4" />
              Employee ID
            </Label>
            <Input id="employeeId" defaultValue="EMP-2024-001" disabled />
          </div>
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Briefcase className="h-4 w-4" />
              Role
            </Label>
            <div className="pt-2">
              <Badge variant="secondary" className="text-sm">
                Senior Developer
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Joining Date
          </Label>
          <div className="pt-2">
            <span className="text-sm text-gray-600">January 15, 2023</span>
          </div>
        </div>

        <Button className="w-full">Update Profile</Button>
      </CardContent>
    </Card>
  );
}

export default ProfileInformation;
