import PropTypes from "prop-types";
import convertTimestamp from "@/utils/convertTimestamp.js";

function PostCard({ author, imageUrl, title, content, createdAt }) {
  return (
    <div className="flex flex-col justify-between gap-3 py-4 tracking-wider text-left">
      <img src={imageUrl} alt="post image" />
      <p className="author">
        {author} - {convertTimestamp(createdAt)}
      </p>
      <h3 className="font-black font-serif text-2xl">{title}</h3>
      <p className="content-hero line-clamp-4">{content}</p>
      <a className="link" href="#">
        Read more
      </a>
    </div>
  );
}

function PostList({ posts }) {
  return (
    <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] justify-center gap-3">
      {posts &&
        posts.map((post) => (
          <PostCard
            key={post.id}
            author={post.author.username}
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
