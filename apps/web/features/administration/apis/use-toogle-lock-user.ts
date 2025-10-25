import { useMutation, useQueryClient } from "@tanstack/react-query";
// import  from "@/lib/axios-instance";
import { InvitePayload } from "./use-resend-invite-mail";
import axios from "axios";



function useToogleLock() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["administrations"],
    mutationFn: async ({ userId }: InvitePayload) => {
      const res = await axios.put(`/v1/user/lock/${userId}`);
      return res.data;
    },
    onSuccess: () => {
    
      queryClient.invalidateQueries({
        queryKey: ["administrations"], 
      });
    },
  });
}

export default useToogleLock;
