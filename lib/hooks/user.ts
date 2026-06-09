import { useMutation, useQuery } from "@tanstack/react-query";
import { IUpdateUserPayload, IUser } from "../types/user";
import { responseHandler } from "../tools/responseHandler";
import { getAll, userServices } from "../services/user";
import { userRoutes } from "../routes/apiRoutes";
import { useEffect, useState } from "react";
import getUser from "../tools/localstorage";

export const useGetUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: [userRoutes.getAll()],
    queryFn: async () => await getAll(),
  });
  return {
    data: data?.data,
    isLoading,
  };
};


export const useUpdateUser = () => {
  return useMutation({
    mutationFn: async (payload: IUpdateUserPayload) => {
      const { id, ...rest } = payload;
      return await userServices.update(payload?.id, rest);
    },
    onError: () => {
      responseHandler.fail("خطا در ویرایش یوزر");
    },
  });
};


export const useGetUser = () : IUser | undefined => {
  const [user, setUser] = useState<IUser | undefined>(undefined);

  useEffect(() => {
    setUser(getUser());
  }, []);
  return user;
}