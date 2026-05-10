import LatestBlogItem from "./LatestBlogItem";

export default function BlogsLatest(){
    return (
        <section className="relative lg:pt-20 dark:bg-dark bg-white lg:pb-24 md:pt-14 md:pb-20 sm:pt-10 sm:pb-16 pt-6 pb-12">
                <div className="absolute top-0 left-0 lg:h-80 h-40 bg-gradient-to-b from-primary via-primary/30 z-0 to-transparent w-full"/>
                <div className="container grid sm:grid-cols-2 gap-5">
                    {[1,2,3,4]?.map(item=>(
                        <LatestBlogItem key={item}/>
                    ))}
                </div>
        </section>
    )
}