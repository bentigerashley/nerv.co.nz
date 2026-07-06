type Props = {
  title?: string;
  description?: string;
  href?: string;
};

export default function PostItem({ title, description, href }: Props) {
  return (
    <article className="w-full z-10">
      <h3 className="font-display origin-left uppercase text-2xl lg:text-3xl mb-3 ml-2 text-amber">
        {title}
      </h3>
      <div className="signal-panel relative px-6 py-4">
        <div className="text-md lg:text-lg relative z-10 text-light-clay">
          {description}
        </div>
        <a
          href={href}
          className="project-link absolute -top-4 right-4 z-20 grid h-11 w-11 place-items-center border border-signal bg-dark-blue font-mono text-xl text-amber transition hover:-translate-y-1 hover:border-amber hover:text-terminal"
          aria-label={`Open ${title}`}
        >
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
