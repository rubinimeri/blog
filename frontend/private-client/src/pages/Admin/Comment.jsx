import convertTimestamp from "@/utils/convertTimestamp.js";
import { Trash2 } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { Button } from "@/components/ui/button.jsx";
import PropTypes from "prop-types";

function Comment({
  id,
  username,
  content,
  createdAt,
  likes,
  avatarUrl,
  handleDelete,
}) {
  return (
    <div className="flex justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8">
            <AvatarImage src={avatarUrl} />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <h3 className="font-[500]">{username}</h3>
          <p className="text-sm text-gray-500">{convertTimestamp(createdAt)}</p>
        </div>
        <div className="ml-11 flex flex-col gap-3">
          <p>{content}</p>
          <p className="text-xs">Likes: {likes}</p>
        </div>
      </div>
      <Button
        className="align-middle rounded-md h-min px-1 py-1"
        variant={"destructive"}
        onClick={(e) => {
          e.preventDefault();
          handleDelete(id);
        }}
      >
        <Trash2 />
      </Button>
    </div>
  );
}

Comment.propTypes = {
  id: PropTypes.string,
  username: PropTypes.string,
  content: PropTypes.string,
  createdAt: PropTypes.string,
  likes: PropTypes.number,
  avatarUrl: PropTypes.string,
  handleDelete: PropTypes.func,
};

export default Comment;
