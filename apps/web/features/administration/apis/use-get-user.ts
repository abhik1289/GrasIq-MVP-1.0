// import api from "@/lib/axios-instance";
// import axiosInstance from "@/lib/axios-instance";
import { SERVER_URL } from "@/lib/config/server.config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function useGetInviteById(userId: string) {
  const query = useQuery({
    queryKey: ["administrations", userId],
    enabled: !!userId,
    queryFn: async () => {
      const res: any = await axios.get(`${SERVER_URL}/v1/user/invite/${userId}`);
      // console.log(res.administrationList);
      return res.data;
    },
  });
  return query;
}

export default useGetInviteById;
