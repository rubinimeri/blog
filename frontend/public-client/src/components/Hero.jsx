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
                    <p className="text-gray-500 text-sm font-bold">rubinimeri - 8 minutes ago</p>
                    <h1 className="font-serif font-black max-sm:text-[34px]">
                        Walking as a Form of
                        Meditation
                    </h1>
                    <p className="text-gray-500 text-xs font-bold tracking-tight text-left">
                        Reflect on how a walk in nature can become a mindful experience, sharpening the senses and grounding us in the present. Highlight the rustling of leaves, the feel of a breeze, and the chorus of bird songs as simple yet profound experiences that elevate walking..
                    </p>
                    <p>
                        <a className="text-blue-500 text-[15px] font-bold underline" href="#">Read more</a>
                    </p>
                </div>
            </section>
            <section className="p-6">
                <div className="flex justify-between">
                    <h2 className="font-bold max-sm:text-2xl">Latest Posts</h2>
                    <a className="text-blue-500 text-[15px] font-bold underline" href="#">See All</a>
                </div>
            </section>
        </main>
    );
}

export default Hero;