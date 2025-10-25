"use client";

import type React from "react";
import ProfileInformation from "./profile-information";
import ProfileSecurity from "./profile-security";

function ProfilePage() {
  return (
    <div className="min-h-screen light:bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-2">
            Manage your account information and security preferences
          </p>
        </div> */}

        <div className="flex flex-col gap-2">
          {/* Section 1: Profile Information */}
          <ProfileInformation />

          {/* Section 2: Security Settings */}
          <ProfileSecurity />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
