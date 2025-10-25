// import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetQuestions(
  examId: string | null,
  sectionId: string | null
) {
  // const queryClient = useQueryClient();

  return useQuery({
    enabled: !!examId,
    queryKey: ["questions", { examId, sectionId }],
    queryFn: () =>
      axios
        .get(`/api/question//${sectionId}/${examId}`)
        .then((res) => res.data),
  });
}

// export default useDeleteInvite;
