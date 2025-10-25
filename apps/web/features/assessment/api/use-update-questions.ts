// import api from "@/lib/axios-instance";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type examPayload = { examId: string; name: string };

export function useUpdateQuestion(qId:string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["questions"],
    mutationFn: async (data:any) => {
      const res = await axios.put(`/api/question/mcq/${qId}`, data);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
  });
}

// export default useDeleteInvite;
