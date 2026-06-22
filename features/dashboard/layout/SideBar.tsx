import Link from "next/link";

import { dashboardPages } from "@/lib/config/site";
import cn from "@/lib/tools/cn";

const SideBar = () => {
  return (
    <div className="w-full h-full bg-transparent">
      <nav className="select-none p-4 flex flex-col gap-y-1.5">
        {dashboardPages?.map((page) => {
          // Replace 'false' with your active route condition, e.g., pathname === page.href
          const isActive = false;

          return (
            <div key={page?.href}>
              <Link
                className={cn(
                  "flex items-center font-semibold gap-3 text-sm px-4 py-3 rounded-xl transition-all duration-200 group relative",
                  isActive
                    ? "bg-primary/10 text-primary font-bold"
                    : "text-slate-400 hover:text-slate-100 hover:bg-slate-800/50",
                )}
                href={page?.href}
              >
                {/* Optional decorative active bar Indicator on the right (RTL) */}
                {isActive && (
                  <span className="absolute right-0 top-1/4 h-1/2 w-1 bg-primary rounded-l-full" />
                )}

                {/* If you have icons, they go here and will animate perfectly with this class */}
                <span
                  className={cn(
                    "transition-transform duration-200 group-hover:translate-x-[-2px]",
                    isActive
                      ? "text-primary"
                      : "text-slate-400 group-hover:text-slate-200",
                  )}
                >
                  {page?.label}
                </span>
              </Link>
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default SideBar;
