import { dashboardPages } from "@/lib/config/site";
import cn from "@/lib/tools/cn";
import Link from "next/link";

const SideBar = () => {
  return (
    <div className="border-2 sticky border-primary rounded-2xl">
      <nav className="select-none rounded-2xl  p-6 flex flex-col gap-y-5">
        {dashboardPages?.map((page) => (
          <div key={page?.href}>
            <Link
              href={page?.href}
              className={cn(
                "flex items-center font-bold gap-3 text-base text-white",
              )}
            >
              {page?.label}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
};
export default SideBar;
