import posts from "@/utils/exampleData.js";
import PostCard from "@/components/PostCard.jsx";

function Hero() {
    return (
        <main className="mx-[70px] max-sm:mx-0 text-center">
            <section className="flex flex-col max-sm:gap-3 max-sm:p-6 bg-gray-100 tracking-wider">
                <h2 className="font-bold text-gray-500 text-[15px]">WELCOME TO GROWTH GRID</h2>
                <h2 className="font-black max-sm:text-xl">We craft narratives that ignite <span className="text-blue-500">growth</span>,
                    <span className="text-blue-500"> knowledge</span> and <span className="text-blue-500">inspiration</span>
                </h2>
            </section>
            <section className="">
                <img src="/hero-img-placeholder.jpg" alt="hero image"/>
                <div className="p-6 flex flex-col max-sm:gap-3 tracking-wider">
                    <p className="">rubinimeri - 8 minutes ago</p>
                    <h1 className="font-serif font-black max-sm:text-[34px]">
                        Walking as a Form of
                        Meditation
                    </h1>
                    <p className="content-hero text-left">
                        Reflect on how a walk in nature can become a mindful experience, sharpening the senses and grounding us in the present. Highlight the rustling of leaves, the feel of a breeze, and the chorus of bird songs as simple yet profound experiences that elevate walking..
                    </p>
                    <p>
                        <a className="link" href="#">Read more</a>
                    </p>
                </div>
            </section>
            <section className="p-6">
                <div className="flex justify-between">
                    <h2 className="font-bold max-sm:text-2xl">Latest Posts</h2>
                    <a className="link" href="#">See All</a>
                </div>
                {posts.map(post => <PostCard key={post.id} {...post} />)}
            </section>
        </main>
    );
}

export default Hero;