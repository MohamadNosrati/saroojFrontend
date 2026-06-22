import { Button } from "@heroui/button";
import Link from "next/link";

import CustomContainer from "@/components/ui/CustomContainer";

const Dashboard = () => {
  return (
    <CustomContainer className="w-full bg-slate-900/40 border border-slate-800 backdrop-blur-md p-6 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl shadow-black/20 group">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          {/* Decorative pulse indicator */}
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <h3 className="text-slate-100 font-extrabold text-lg sm:text-xl tracking-wide">
            تحلیل و بررسی داده‌های وب‌سایت (Web Analytics)
          </h3>
        </div>
        <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xl">
          برای مشاهده و رصد دقیق متریک‌های مختلف رفتاری کاربران، روی دکمه ورود
          به پنل تحلیلی کلیک کنید.
        </p>
      </div>

      <Link
        href={process.env.NEXT_PUBLIC_POSTHOG_ANALYTICS_LINK as string}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full sm:w-auto"
      >
        <Button
          className="w-full sm:w-auto px-6 h-12 bg-primary text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:scale-[1.02] transition-all duration-200"
          size="lg"
        >
          ورود به پنل PostHog
        </Button>
      </Link>
    </CustomContainer>
  );
};

export default Dashboard;
