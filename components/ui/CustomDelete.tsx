import { categoriesRoute, TeamatesRoute } from "@/lib/routes/apiRoutes";
import { temateServices } from "@/lib/services/teamates";
import { responseHandler } from "@/lib/tools/responseHandler";
import { Button } from "@heroui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@heroui/popover";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { DeleteIcon } from "../icons";
import { categoryServices } from "@/lib/services/categories";

export type TEntity = "category" | "teamate" | "comment" | "project";

interface ICustomDeleteProps {
  id: string;
  title: string;
  entity: TEntity;
}

const CustomDelete: React.FC<ICustomDeleteProps> = ({ id, title, entity }) => {
  const config = {
    teamate: {
      service: temateServices,
      route: TeamatesRoute,
    },
    category: {
      service: categoryServices,
      route: categoriesRoute,
    },
    comment: {
      service: categoryServices,
      route: categoriesRoute,
    },
    project: {
      service: categoryServices,
      route: categoriesRoute,
    },
  };
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const queryClient = useQueryClient();
  const deleteHandler = async () => {
    try {
      setIsDeleting(true);
      const res = await config[entity].service.delete(id);
      responseHandler.success(res?.data?.message);
      queryClient.invalidateQueries({
        queryKey: [config[entity].route.getAll()],
      });
      setIsDeleteOpen(false);
    } catch (err) {
      responseHandler.fail(err);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <Popover
      showArrow
      isOpen={isDeleteOpen}
      onOpenChange={(open) => setIsDeleteOpen(open)}
      classNames={{
        content: "border border-white/10",
      }}
    >
      <PopoverTrigger>
        <Button
          as="span"
          className="w-auto min-w-0 bg-transparent px-0 text-woodSmoke-600 hover:text-danger aria-[expanded~=true]:text-danger data-[aria-expanded~=true]:text-danger"
        >
          <DeleteIcon
            width={24}
            height={24}
            className="text-charade-600 hover:text-rose-500"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="space-y-3 p-1.5">
          <p className="text-xs text-slate-600 dark:text-white">{`آیا از پاک کردن دسترسی Api ${title} اطمینان دارید؟`}</p>
          <div className="flex justify-end">
            <Button
              as="span"
              size="sm"
              variant="flat"
              className="h-auto min-w-0 rounded-l-none p-1 px-2"
              onClick={() => setIsDeleteOpen(false)}
            >
              انصراف
            </Button>
            <Button
              isLoading={isDeleting}
              as="span"
              color="danger"
              variant="flat"
              size="sm"
              className="h-auto min-w-0 rounded-r-none p-1 px-2"
              onClick={deleteHandler}
            >
              تایید
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CustomDelete;
