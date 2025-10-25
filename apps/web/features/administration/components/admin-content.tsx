"use client";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";

import { Tabs, TabsContent } from "@workspace/ui/components/tabs";

import { IAdmin } from "../types/admin.types";
// import AdminTableRow from "./invite-table-row";
import { DataTable } from "./data-table";
import { useAdminColumns } from "./columns";
// import { useColumns } from "./columns";



const roleColors = {
  "Super Admin": "bg-red-100 text-red-800 border-red-200",
  Admin: "bg-blue-100 text-blue-800 border-blue-200",
  Moderator: "bg-green-100 text-green-800 border-green-200",
};

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  expired: "bg-red-100 text-red-800 border-red-200",
  active: "bg-green-100 text-green-800 border-green-200",
};

function AdminContent({ adminList }:{adminList:IAdmin[]}) {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };
  // return <div>Loading</div>;
  // }
  // console.log(adminList.data)

  // console.log(adminList);
  const colmuns = useAdminColumns();
  return (
    <TabsContent value="active" className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Active Administrators</CardTitle>
          <CardDescription>
            Manage current administrators and their permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={colmuns} data={adminList} />
        </CardContent>
      </Card>
    </TabsContent>
  );
}

export default AdminContent;
