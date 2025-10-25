// import api from "@/lib/axios-instance";
import { SERVER_URL } from "@/lib/config/server.config";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useSignIn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await axios.post(
        `/v1/user/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError(error, variables, context) {
      console.log(error, variables, context);
    },
  });
  return mutation;
};
