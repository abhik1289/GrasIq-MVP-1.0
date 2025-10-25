export const roleColors = {
  SUPER_ADMIN: "bg-purple-100 text-purple-800 border-purple-200",
  ADMIN: "bg-blue-100 text-blue-800 border-blue-200",
  MODERATOR: "bg-green-100 text-green-800 border-green-200",
};

//   ADMIN
//   SUPER_ADMIN
//   USER
//   MODERATOR
export const getRole = (role: string): string => {
  console.log(role);
  switch (role) {
    case "ADMIN":
      return "Admin";
    case "SUPER_ADMIN":
      return "Super Admin";
    case "USER":
      return "User";
    default:
      return "Moderator";
  }
};
