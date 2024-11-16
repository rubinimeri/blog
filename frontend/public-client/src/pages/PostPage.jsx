import Header from "@/components/Header.jsx";
import Footer from "@/components/Footer.jsx";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea.jsx";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.jsx";
import { useState } from "react";

function Sort() {
  return (
    <Select>
      <SelectTrigger className="w-[150px] max-md:w-[100px]">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="oldest">Oldest</SelectItem>
        <SelectItem value="newest">Newest</SelectItem>
        <SelectItem value="likes">Likes</SelectItem>
      </SelectContent>
    </Select>
  );
}

export function AddComment() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>+ Comment</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add a Comment</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" placeholder="John Doe" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            <Label htmlFor="comment" className="text-right">
              Comment
            </Label>
            <Textarea className="w-full col-span-3" placeholder="..." />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function Comment({ name, comment, createdAt }) {
  const [likeCount, setLikeCount] = useState(12);
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    } else {
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h3 className="font-[500]">Rubin Imeri</h3>
        <p className="text-sm text-gray-500">8 minutes ago</p>
      </div>
      <div className="ml-11 flex flex-col gap-3">
        <p>
          Hope you guys like this post! For a beginner like me I think it's
          decent
        </p>
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
          <p className="text-xs">{likeCount}</p>
        </div>
      </div>
    </div>
  );
}

function PostPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-[768px] p-6 max-md:px-0 flex flex-col gap-6 md:text-left lg:py-[30px]">
        <div>
          <h2 className="author text-center tracking-wider">
            rubinimeri - 8 minutes ago
          </h2>
          <h1 className="font-serif font-black text-center tracking-wider text-4xl max-sm:text-[34px] p-2">
            The Beauty of Nature: A Journey Through the Outdoors
          </h1>
        </div>

        <div className="flex items-center justify-center overflow-hidden h-[400px]">
          <img src="/hero-img-placeholder.jpg" alt="hero image" />
        </div>

        <div className="flex flex-col gap-4 max-md:px-6">
          <h2 className="font-bold text-xl">The Awe-Inspiring Mountains</h2>
          <p className="text-gray-600">
            Mountains are a testament to the majesty and resilience of the
            natural world. Standing at the foot of a towering mountain, it&#39;s
            hard not to feel a sense of awe and wonder at the sheer scale of the
            landscape before you. The air is crisp, and the scent of pine fills
            your senses, grounding you in the moment. Hiking through mountain
            trails, we encounter rugged terrain, steep climbs, and breathtaking
            vistas that reward us with a feeling of accomplishment and a deeper
            connection to the earth. Each mountain, shaped over millions of
            years, carries a history that humbles us, reminding us of the
            fleeting nature of human life in comparison to the timeless strength
            of the mountains.
          </p>

          <h2 className="font-bold text-xl">The Calming Serenity of Forests</h2>
          <p className="text-gray-600">
            Forests are a sanctuary for both the body and soul, offering a place
            where time seems to slow down, and peace is found in every corner.
            As you step into a forest, the cool shade and dappled sunlight
            create an atmosphere of quiet serenity. Birds chirp in the canopy
            overhead, insects hum in the underbrush, and a gentle breeze rustles
            through the leaves. Each tree, with its unique bark and leaves,
            tells a story of survival and growth. In these green sanctuaries, we
            find ourselves surrounded by life in all its forms, from the
            delicate mosses to towering ancient oaks. Walking in the forest, we
            are reminded of the importance of patience, growth, and
            interconnectedness in the grand cycle of nature.
          </p>

          <h2 className="font-bold text-xl">
            The Mesmerizing Oceans and Beaches
          </h2>
          <p className="text-gray-600">
            The ocean, with its vast and seemingly endless horizon, has a power
            that captivates the human soul. Standing on a beach, we witness the
            rhythmic dance of waves crashing onto the shore, each wave carrying
            stories of distant lands and unexplored depths. The scent of salt
            and the feel of sand beneath our feet are grounding, connecting us
            to the primal elements of earth and water. Beaches offer a place for
            play, relaxation, and reflection as we marvel at the expanse of the
            sea. Each grain of sand, each shell, and each crashing wave reminds
            us of the beauty of change and the cycles of nature that shape our
            world. The ocean’s tides, pulled by the moon, remind us that
            everything in nature is connected in ways beyond our imagination.
          </p>

          <h2 className="font-bold text-xl">
            The Quiet Beauty of Sunrises and Sunsets
          </h2>
          <p className="text-gray-600">
            Sunrises and sunsets are nature&#39;s way of marking the passing of
            time, creating a daily spectacle of light and color. The sky
            transitions from dark to a soft pink, then to blazing orange,
            filling the horizon with warmth and beauty. Watching the sunrise is
            like witnessing the birth of a new day, full of potential and
            promise. Sunsets, on the other hand, signal the end of a day, a
            reminder to reflect, slow down, and appreciate the beauty of each
            moment. As the sun dips below the horizon, hues of deep red and
            purple fill the sky, creating a tranquil scene that encourages us to
            pause and savor the fleeting beauty of the world. Sunrises and
            sunsets are powerful symbols of renewal, a reminder that every
            ending carries the seed of a new beginning.
          </p>

          <h2 className="font-bold text-xl">The Wonder of Night Skies</h2>
          <p className="text-gray-600">
            The night sky, studded with stars, planets, and distant galaxies, is
            one of the most humbling and awe-inspiring sights in nature. Looking
            up at the stars on a clear night, we get a glimpse of the
            universe&#39;s vastness and our place within it. Each star is a sun,
            many of which are millions of light-years away, reminding us of the
            unimaginable scales of space and time. The Milky Way stretches
            across the sky, a cosmic river of stars, each one a tiny point of
            light in the vast ocean of the universe. Gazing at the stars reminds
            us of the mysteries of existence and our deep-rooted connection to
            the cosmos. The night sky is a powerful reminder of both the beauty
            and mystery of life, a spectacle that inspires wonder, curiosity,
            and a sense of peace.
          </p>
        </div>
      </main>
      <section className="flex flex-col gap-4 max-w-[800px] mx-auto px-10 py-4 bg-gray-100 rounded-xl">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">Comments</h2>
          <div className="flex items-center gap-2">
            <Sort />
            <AddComment />
          </div>
        </div>
        <Comment />
        <Comment />
        <Comment />
        <Comment />
      </section>
      <Footer />
    </>
  );
}

export default PostPage;
