import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import api from "@/lib/axios-instance";

interface InvitePayload {
  email: string;
  firstName: string;
  roleId: string;
  userId: string;
}

function useUpdateInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["administrations"],
    mutationFn: async ({ email, firstName, roleId, userId }: InvitePayload) => {
      const res = await axios.put(`/v1/user/invite/${userId}`, {
        email,
        firstName,
        roleId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["administrations"],
      });
    },
  });
}

export default useUpdateInvitation;
