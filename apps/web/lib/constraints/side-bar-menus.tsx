import {
  LayoutDashboard as IconDashboard,
  FileStack as IconListDetails,
  Users as IconChartBar,
  Folder as IconFolder,
  Settings as IconSettings,
  HelpCircle as IconHelp,
  Database as IconDatabase,
  FileBarChart2 as IconReport,
  GraduationCap,
  School,
  BookText,
  UsersRound,
  BookOpen,
} from "lucide-react";

export const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/",
      icon: IconDashboard,
    },
    {
      title: "Administration",
      url: "/administration",
      icon: IconListDetails,
    },
    {
      title: "User Management",
      url: "#",
      icon: IconChartBar,
      subMenus: [
        {
          title: "Users",
          url: "/users",
          icon: UsersRound, // direct reference for clarity
        },
        {
          title: "Colleges",
          url: "/colleges",
          icon: GraduationCap,
        },
        {
          title: "Classroom",
          url: "/clasroom",
          icon: School,
        },
        {
          title: "Course & Branch",
          url: "/course_branch",
          icon: BookOpen,
        },
      ],
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: IconFolder,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: IconSettings,
    },
    {
      title: "Get Help",
      url: "/help",
      icon: IconHelp,
    },
  ],
  documents: [
    {
      name: "Assessment",
      url: "/assessment",
      icon: IconDatabase,
    },
    {
      name: "Reports",
      url: "/reports",
      icon: IconReport,
    },
  ],
};
