"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomTable from "@/components/ui/CustomTable";
import { useGetUsers } from "@/lib/hooks/user";

const columns = [
  { name: "عکس", uid: "pictureId" },
  { name: "ایمیل", uid: "email" },
  { name: "نام کاربری", uid: "userName" },
  { name: "نقش", uid: "role" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
];

const UsersPage = () => {
  const { data, isLoading } = useGetUsers();

  return (
    <CustomContainer className="flex flex-col gap-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white-gray">لیست اعضا</h1>
        </div>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          columns={columns}
          isLoading={isLoading}
          items={data?.data || []}
        />
      </div>
    </CustomContainer>
  );
};

export default UsersPage;
