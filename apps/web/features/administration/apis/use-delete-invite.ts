import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios-instance";
import { InvitePayload } from "./use-resend-invite-mail";
import axios from "axios";



function useDeleteInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["administrations"],
    mutationFn: async ({ userId}: InvitePayload) => {
      const res = await axios.delete(`/v1/user/invite/${userId}`);
      return res.data;
    },
    onSuccess: () => {
    
      queryClient.invalidateQueries({
        queryKey: ["administrations"], 
      });
    },
  });
}

export default useDeleteInvite;
