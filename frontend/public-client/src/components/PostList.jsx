import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { load } from "cheerio";
import decodeHTMLEntities from "@/utils/decodeContent.js";

function PostCard({ id, author, imageUrl, title, content, createdAt }) {
  // Get first paragraph from content using cheerio
  const decodedContent = decodeHTMLEntities(content);
  const $ = load(decodedContent);
  const firstParagraph = $("p").first().text();
  console.log("firstParagraph", firstParagraph);

  return (
    <div className="flex flex-col justify-between gap-3 py-4 tracking-wider text-left">
      <img src={imageUrl} alt="post image" />
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
          <PostCard
            key={post.id}
            id={post.id}
            author={post.author.username}
            title={post.title}
            imageUrl={post.imageUrl}
            content={post.content}
            createdAt={post.createdAt}
          />
        ))}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
};

PostCard.propTypes = {
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
};

export default PostList;
