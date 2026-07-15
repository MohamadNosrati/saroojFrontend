"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import CustomTable from "@/components/ui/CustomTable";
import { useDeleteUpload, useGetUploads } from "@/lib/hooks/upload";

const columns = [
  { name: "عکس", uid: "image" },
  { name: "تاریخ ساخت", uid: "createdAt" },
  { name: "تاریخ ویرایش", uid: "updatedAt" },
  { name: "عملیات", uid: "actions" },
];

const BlogsPage = () => {
  const { data, isLoading } = useGetUploads();
  const { isPending, mutate: deleteCategory } = useDeleteUpload();

  const deleteHandler = (id: string) => {
    deleteCategory(id);
  };

  return (
    <CustomContainer className="flex flex-col gap-y-4">
      <div>
        <h1 className="text-2xl font-bold text-white-gray"> لیست تصاویر</h1>
      </div>
      <div className="bg-component-base-2 rounded-2xl">
        <CustomTable
          columns={columns}
          deleteHandler={deleteHandler}
          isLoading={isLoading}
          isPending={isPending}
          items={data?.data || []}
        />
      </div>
    </CustomContainer>
  );
};

export default BlogsPage;
