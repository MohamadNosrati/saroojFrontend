import clsx from "clsx";

interface IProps {
    item: {
        key: string;
        icon: any;
        value: string;
    }
}

export default function InfoItem({ item }: IProps) {
    const Icon = item?.icon;
    return (
        <div className={clsx([
            "flex items-center gap-3",
            item.key === "description" ? "col-span-2" : "col-span-1"
        ])}>
            <Icon className="text-primary sm:size-10 size-8" />
            <span className="dark:text-gray-lighter font-medium text-xl">{` ${item?.key} : ${item.value}`}</span>
        </div>
    )
}