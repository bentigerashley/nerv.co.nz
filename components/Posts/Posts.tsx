import PostItem from "./PostItem";
import PostsGradient from "../../public/assets/Posts-Gradient.svg";
import Zoom from "../../public/assets/zoom.svg";
import Image from "next/image";

type Props = {
  posts: Post[];
};

interface Post {
  link: string;
  title: string;
  desc: string;
}

export default function Posts({ posts }: Props) {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center">
      <div className="flex flex-wrap mx-10 lg:mx-24 gap-10 lg:gap-16 relative my-auto">
        <div className="absolute top-1/2 first-letter:z-0">
          <Image
            className="-mt-[12%] hidden lg:block"
            alt="a pretty gradient :D"
            src={PostsGradient}
          />
        </div>
        {posts.map((post, i) => {
          if (i < 5)
            return (
              <PostItem
                key={post.link || post.title}
                href={post.link}
                title={post.title}
                description={post.desc}
              />
            );
          return null;
        })}
        <a
          className="w-full -mt-10 ml-2 sm:ml-24 md:ml-28 lg:ml-6 text-terminal text-md flex items-center transition hover:text-amber hover:-translate-y-2"
          href="https://github.com/bentigerashley"
        >
          Open Repository Index
          <Image className="ml-1 hover:scale-105 " src={Zoom} alt="" />
        </a>
      </div>
    </div>
  );
}
