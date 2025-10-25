export const getInvitePersonStatus = (expiry: string | Date) => {
  const expiryDate = new Date(expiry);
  const now = new Date();

  if (now > expiryDate) {
    return { status: "expired", message: "Expired" };
  }

  const diffMs = expiryDate.getTime() - now.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  return {
    status: "pending",
    message: `${diffMinutes} minute(s) left`,
  };
};