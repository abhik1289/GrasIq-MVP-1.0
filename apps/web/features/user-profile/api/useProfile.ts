// hooks/useUser.ts
// import api from "@/lib/axios-instance";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
// import api from '@/lib/axios';

export const useUser = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const res:any = await axios.get("/v1/user/profile");
      return res.data;
    },
    retry: false,
    // staleTime: 1000 * 60 * 5,
  });
};
