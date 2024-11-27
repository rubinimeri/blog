import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { load } from "cheerio";

function PostCard({ id, author, imageUrl, title, content, createdAt }) {
  // Get first paragraph from content using cheerio
  const $ = load(content);
  const firstParagraph = $("p").first().text();

  return (
    <div className="flex flex-col justify-between gap-3 py-4 tracking-wider text-left">
      <div className="aspect-[16-10] flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt="post image"
          className="shrink-0 min-w-full min-h-full"
        />
      </div>
      <p className="author">
        {author} - {convertTimestamp(createdAt)}
      </p>
      <h3 className="font-black font-serif text-2xl">{title}</h3>
      <p className="content-hero line-clamp-4">{firstParagraph}</p>
      <Link to={`/post/${id}`} className="link">
        Read more
      </Link>
    </div>
  );
}

function PostList({ posts }) {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] justify-center gap-3">
      {posts &&
        posts.map((post) => (
          <PostCard key={post.id} {...post} author={post.author.username} />
        ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
};

PostCard.propTypes = {
  id: PropTypes.string,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
};

export default PostList;
