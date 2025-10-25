import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
// import api from "@/lib/axios-instance";

interface InvitePayload {
  email: string;
  firstName: string;
  roleId: string;
}

function useSentInvitation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["administrations"],
    mutationFn: async ({ email, firstName, roleId }: InvitePayload) => {
      const res = await axios.post(`/v1/user/invite`, {
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

export default useSentInvitation;
