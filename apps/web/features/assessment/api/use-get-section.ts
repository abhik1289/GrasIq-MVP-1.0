// import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function useGetSection(sectionId: string) {
  return useQuery({
    enabled: !!sectionId, // only run if examId exists
    queryKey: ["section",sectionId], // include examId in the key for proper caching
    queryFn: async () => {
      const { data } = await axios.get(`/api/section/${sectionId}`);
      return data; 
    },
  });
}
