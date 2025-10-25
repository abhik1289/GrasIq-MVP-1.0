// import api from "@/lib/axios-instance";
// import axiosInstance from "@/lib/axios-instance";
import { SERVER_URL } from "@/lib/config/server.config";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
function useGetAdmininstrationList() {
  const query = useQuery({
    queryKey: ["administrations"],
    queryFn: async () => {
      const res: any = await axios.get(
        `/api/user/admin`
      );
      return res.data;
    },
  });
  return query;
}

export default useGetAdmininstrationList;
