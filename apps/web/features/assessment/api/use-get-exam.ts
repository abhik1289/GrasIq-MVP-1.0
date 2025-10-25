// import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetExam() {
  // const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["exam"],
    queryFn: () => axios.get(`/api/exam`).then((res) => res.data),
  });
}

// export default useDeleteInvite;
