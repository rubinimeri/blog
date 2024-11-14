import PropTypes from "prop-types";

function PostCard({ id, author, imageUrl, title, content, dateAdded }) {
  return (
    <div className="flex flex-col justify-between gap-3 py-4 tracking-wider text-left">
      <img src={imageUrl} alt="post image" />
      <p className="author">
        {author} - {dateAdded}
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
      {posts && posts.map((post) => <PostCard key={post.id} {...post} />)}
    </div>
  );
}

PostList.propTypes = {
  posts: PropTypes.array,
};

PostCard.propTypes = {
  id: PropTypes.number,
  author: PropTypes.string,
  imageUrl: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
  dateAdded: PropTypes.string,
};

export default PostList;
