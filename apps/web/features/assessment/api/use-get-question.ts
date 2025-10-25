// import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetQuestion(qId:string) {
  // const queryClient = useQueryClient();

  return useQuery({
    enabled: !!qId,
    queryKey: ["questions", qId],
    queryFn: () => axios.get(`/api/question/${qId}`).then((res) => res.data),
  });
}

// export default useDeleteInvite;
