import PropTypes from "prop-types";

function PostCard({ id, author, imageUrl, title, content, dateAdded }) {
    return (
        <div className="flex flex-col gap-4 py-4 tracking-wider text-left">
            <img src={imageUrl} alt="post image"/>
            <p className="author">{author} - {dateAdded}</p>
            <h3 className="font-black font-serif text-2xl">{title}</h3>
            <p className="content-hero">{content}</p>
            <a className="link" href="#">Read more</a>
        </div>
    );
}

PostCard.propTypes = {
    id: PropTypes.number,
    author: PropTypes.string,
    imageUrl: PropTypes.string,
    title: PropTypes.string,
    content: PropTypes.string,
    dateAdded: PropTypes.string,
}

export default PostCard;