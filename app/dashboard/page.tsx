import CustomContainer from "@/components/ui/CustomContainer";
import { Button } from "@heroui/button";
import Link from "next/link";

const Dashboard = () => {
  return (
    <CustomContainer className="flex justify-between">
      <p className="text-white font-bold text-2xl">
        برای مشاهده متریک های مختلف سابت (web analytics) به لینک روبرو مراجع
        کنید.
      </p>
      <Link href={process.env.NEXT_PUBLIC_POSTHOG_ANALYTICS_LINK as string}>
        <Button className="text-white" size="lg" color="success">
          posthug
        </Button>
      </Link>
    </CustomContainer>
  );
};

export default Dashboard;
