import RelatedBlogsContainer from "./Container";

export default function RelatedBlogs() {
    return (
        <section className="bg-gradient-to-b dark:bg-dark bg-white from-primary via-primary/25 to-transparent lg:pt-12 sm:pt-8 pt-6 lg:pb-16 pb-8">
            <div className="container">
                <div className="mb-2.5">
                    <span className="sm:text-2xl font-bold text-lg">مقالات پیشنهادی</span>
                </div>
                <RelatedBlogsContainer />
            </div>
        </section>
    )
}