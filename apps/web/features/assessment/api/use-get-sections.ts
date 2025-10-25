// import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetSections(examId: string) {
  return useQuery({
    enabled: !!examId, // only run if examId exists
    queryKey: ["sections"], // include examId in the key for proper caching
    queryFn: async () => {
      const { data } = await axios.get(`/api/exam/${examId}/sections`);
      return data; 
    },
  });
}
