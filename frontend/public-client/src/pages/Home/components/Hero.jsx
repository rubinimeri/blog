import PostList from "@/components/PostList.jsx";
import usePosts from "@/hooks/usePosts.js";
import { Link } from "react-router-dom";
import { load } from "cheerio";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { Loader2 } from "lucide-react";
import PropTypes from "prop-types";

export default function Hero() {
  const { loading, error, posts } = usePosts();

  if (loading)
    return (
      <div>
        <div className="min-h-[90vh] flex justify-center items-center">
          <Loader2 className="animate-spin" width={50} height={50} />
        </div>
      </div>
    );

  if (error)
    return (
      <main className="min-h-[80vh] grid place-items-center">
        <h1 className="text-center">{error}</h1>
      </main>
    );

  if (posts.length === 0) {
    return (
      <main className="min-h-[80vh]">
        <h1 className="text-center font-serif font-black p-10">
          No posts yet...
        </h1>
      </main>
    );
  }

  const mainPost = posts[0];
  const $ = load(mainPost.content);
  const firstParagraph = $("p").first().text();

  return (
    <main className="max-sm:mx-0 text-center max-w-[1200px] mx-auto">
      <section className="flex flex-col gap-3 sm:p-10 md:rounded-[30px] md:mx-[25px] mt-[15px] max-sm:p-6 bg-gray-100 tracking-wider">
        <h2 className="font-bold text-gray-500 text-[15px] lg:text">
          WELCOME TO GROWTH GRID
        </h2>
        <h2 className="font-black md:text-2xl max-w-[600px] mx-auto max-md:text-xl">
          We craft narratives that ignite{" "}
          <span className="text-blue-500">growth</span>,
          <span className="text-blue-500"> knowledge</span> and{" "}
          <span className="text-blue-500">inspiration</span>
        </h2>
      </section>
      <section className="p-6 max-md:p-0 flex max-md:block gap-4 md:text-left lg:py-[30px]">
        <div className="flex-1">
          <img
            className="md:rounded-[30px] "
            src={mainPost.imageUrl}
            alt="hero image"
          />
        </div>
        <div className="min-h-full flex flex-col justify-between gap-5 flex-1 max-md:gap-3 max-md:p-6 max-md:max-w-md max-md:mx-auto tracking-wider">
          <p className="author">
            {`${mainPost.author.username} - ${convertTimestamp(mainPost.createdAt)}`}
          </p>
          <h1 className="font-serif font-black max-lg:text-4xl max-sm:text-[34px]">
            {mainPost.title}
          </h1>
          <p className="content-hero text-left lg:tracking-wider max-w-md">
            {firstParagraph}
          </p>
          <p>
            <Link className="link" to={`/post/${mainPost.id}`}>
              Read more
            </Link>
          </p>
        </div>
      </section>
      <LatestPosts>
        <PostList posts={posts} />
      </LatestPosts>
    </main>
  );
}

function LatestPosts({ children }) {
  return (
    <section className="p-6 w-full">
      <div className="flex justify-between">
        <h2 className="font-bold sm:text-[28px] max-sm:text-2xl">
          Latest Posts
        </h2>
        <Link to="/all-posts/1" className="link">
          See All
        </Link>
      </div>
      {children}
    </section>
  );
}

LatestPosts.propTypes = {
  children: PropTypes.node,
};
