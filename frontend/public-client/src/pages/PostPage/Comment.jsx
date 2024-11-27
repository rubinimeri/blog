import PropTypes from "prop-types";
import convertTimestamp from "@/utils/convertTimestamp.js";
import { useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";

function Comment({
  id,
  username,
  content,
  createdAt,
  likes,
  handleLikeUnlikeComment,
}) {
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = async () => {
    if (isLiked) {
      setIsLiked(false);
      await handleLikeUnlikeComment(id, "unlike");
    } else {
      setIsLiked(true);
      await handleLikeUnlikeComment(id);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-[500]">{username}</h3>
        <p className="text-sm text-gray-500">{convertTimestamp(createdAt)}</p>
      </div>
      <div className="ml-11 flex flex-col gap-3">
        <p>{content}</p>
        <div className="flex items-center gap-1">
          {isLiked ? (
            <img
              className={`cursor-pointer`}
              src="/heart-full.png"
              alt="like icon"
              width={16}
              onClick={handleLike}
            />
          ) : (
            <img
              className={`cursor-pointer ${isLiked && "hidden"}`}
              src="/heart.png"
              alt="like icon"
              width={16}
              onClick={handleLike}
            />
          )}
          <p className="text-xs">{likes}</p>
        </div>
      </div>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  likes: PropTypes.number,
  handleLikeUnlikeComment: PropTypes.func,
};

export default Comment;
