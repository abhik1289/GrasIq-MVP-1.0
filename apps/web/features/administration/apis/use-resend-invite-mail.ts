import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import axios from "@/lib/axios-instance";

export interface InvitePayload {
  userId: string;
}

function useReSentInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["administrations"],
    mutationFn: async ({ userId }: InvitePayload) => {
      const res = await axios.patch(`/v1/user/invite/resend/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["administrations"],
      });
    },
  });
}

export default useReSentInvitation;
