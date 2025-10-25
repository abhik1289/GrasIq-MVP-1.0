import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "@/lib/axios-instance";
import { InvitePayload } from "./use-resend-invite-mail";
import axios from "axios";



function useToogleBan() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["administrations"],
    mutationFn: async ({userId }: InvitePayload) => {
      const res = await axios.put(`/v1/user/ban/${userId}`);
      return res.data;
    },
    onSuccess: () => {
    
      queryClient.invalidateQueries({
        queryKey: ["administrations"], 
      });
    },
  });
}

export default useToogleBan;
