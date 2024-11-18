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

function AddComment() {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const usernameRef = useRef(null);
  const commentRef = useRef(null);
  const closeRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsername(usernameRef.current.value);
    setComment(commentRef.current.value);
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
              Name
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
              Comment
            </Label>
            <Textarea
              ref={commentRef}
              className="w-full col-span-3"
              placeholder="..."
              required
            />
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

export default AddComment;
