"use client";

import { Pagination } from "@heroui/pagination";
import BlogItem from "./BlogItem";
import { Select, SelectItem } from "@heroui/select";
import { useState } from "react";

enum SortByEnum {
    NEWEST = "newest",
    OLDEST = "oldest",
}

type TOption = {
    label: string;
    key: SortByEnum
}

const options: TOption[] = [
    {
        key: SortByEnum.NEWEST,
        label: "جدیدترین"
    },
    {
        key: SortByEnum.OLDEST,
        label: "قدیمی ترین"
    }
]



export default function BlogsList() {
    const [selected, setSelected] = useState<SortByEnum>(SortByEnum.NEWEST);
    return (
        <section className="relative  dark:bg-dark bg-white lg:pb-24  md:pb-20 sm:pt-10 sm:pb-16 pb-12">
            <div className="container flex flex-col gap-4">
                <div className="flex items-center justify-between">
                    <div>
                        <span className="dark:text-white font-medium sm:text-2xl text-xl  text-dark">لیست مقالات</span>
                    </div>
                    <div className="w-60">
                        <Select
                            classNames={{
                                trigger: "dark:bg-gray-darker dark:text-white bg-default",
                                innerWrapper: "text-white"
                            }}
                            aria-label="fdsf"
                            fullWidth
                            selectedKeys={[selected]}
                            defaultSelectedKeys={[SortByEnum.NEWEST]}
                            onChange={(e) => {
                                if (e.target.value) {
                                    setSelected(e?.target.value as SortByEnum)
                                }
                            }}
                        >
                            {options.map((animal) => (
                                <SelectItem key={animal.key}>{animal.label}</SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="grid gap-5 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]?.map(item => (
                        <BlogItem key={item} />
                    ))}
                </div>
                <div className="flex relative z-10 justify-center lg:mt-16 sm:mt-12 mt-8">
                    <Pagination classNames={{
                        item: "font-bold",
                    }} dir="ltr" showControls initialPage={1} total={10} />
                </div>
            </div>
            <div className="absolute bottom-0 left-0 lg:h-80 h-40 bg-gradient-to-t from-primary via-primary/30 z-0 to-transparent w-full" />
        </section>
    )
}