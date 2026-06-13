import Link from "next/link";

interface IProps {
  data: {
    label: string;
    href: string;
    icon: any;
  }[];
}

export default function DeskTopNavigation({ data }: IProps) {
  return (
    <div className="flex max-lg:hidden items-center gap-12">
      {data?.map((item) => {
        const Icon = item?.icon;

        return (
          <Link
            key={item?.label}
            className="dark:text-white hover:text-primary hover:dark:text-primary transition-all duration-300 flex min-w-fit items-center gap-1 text-black font-bold"
            href={item?.href}
          >
            <span className="block pb-1">
              <Icon height={20} width={20} />
            </span>
            {item?.label}
          </Link>
        );
      })}
    </div>
  );
}
