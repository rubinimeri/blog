import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Label } from "@/components/ui/label.jsx";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

function AddComment({ handleAddComment }) {
  const [errorMessage, setErrorMessage] = useState("");
  const usernameRef = useRef(null);
  const commentRef = useRef(null);
  const closeRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    const username = usernameRef.current.value;
    const content = commentRef.current.value;

    if (!username) {
      return setErrorMessage("Name is required");
    }

    if (!content) {
      return setErrorMessage("Comment is required");
    }

    await handleAddComment(username, content);

    closeRef.current.click();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Comment</Button>
      </DialogTrigger>
      <DialogContent ref={closeRef} className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name *
            </Label>
            <Input
              ref={usernameRef}
              id="name"
              className="col-span-3"
              placeholder="John Doe"
              required
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment *
            </Label>
            <Textarea
              ref={commentRef}
              className="w-full col-span-3"
              placeholder="..."
              required
            />
            <p className="col-start-2 col-span-3 text-red-600 font-bold text-xs my-0">
              {errorMessage}
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} type="submit">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

AddComment.propTypes = {
  handleAddComment: PropTypes.func,
};

export default AddComment;
