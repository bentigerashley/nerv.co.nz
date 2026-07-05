import PostItem from "./PostItem";

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
    <section className="min-h-screen min-w-screen flex justify-center items-center px-6 py-16">
      <div className="w-full max-w-6xl relative">
        <div className="telemetry-backdrop" aria-hidden="true" />
        <header className="relative z-10 mb-10 border-b border-signal pb-3 flex items-end justify-between gap-4">
          <h2 className="font-display origin-left uppercase text-4xl md:text-6xl text-light-clay">Project directory</h2>
          <span className="hidden sm:block font-mono text-xs text-terminal">ACTIVE CHANNEL // 01</span>
        </header>
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {posts.slice(0, 5).map((post) => (
            <PostItem
              key={post.link || post.title}
              href={post.link}
              title={post.title}
              description={post.desc}
            />
          ))}
        </div>
        <a
          className="relative z-10 mt-10 ml-2 text-terminal text-md inline-flex items-center transition hover:text-amber hover:-translate-y-1"
          href="https://github.com/bentigerashley"
        >
          Open Repository Index
          <span className="ml-2 text-amber" aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
