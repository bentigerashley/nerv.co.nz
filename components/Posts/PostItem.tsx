import { lazy, useState } from "react";
import { Canvas } from "@react-three/fiber";
const LinkModel = lazy(() => import("./Link"));

type Props = {
  title?: string;
  description?: string;
  href?: string;
};

export default function PostItem({ title, description, href }: Props) {
  const [linkHovered, setLinkHovered] = useState(false);
  return (
    <article className="w-full z-10">
      <h3 className="font-display uppercase text-2xl lg:text-3xl mb-3 ml-2 text-amber">
        {title}
      </h3>
      <div className="signal-panel relative px-6 py-4">
        <div className="text-md lg:text-lg relative z-10 text-light-clay">
          {description}
        </div>
        <a
          href={href}
          className="absolute top-0 right-0 z-0 w-30 h-30"
          aria-label={`Open ${title}`}
        >
          <Canvas
            onMouseEnter={() => setLinkHovered(true)}
            onMouseLeave={() => setLinkHovered(false)}
            className="-mt-[25%] ml-[50%]"
            onCreated={(state) => state.gl.setClearColor("black", 0.0)}
            camera={{ position: [0, 0, 4] }}
          >
            <LinkModel hovered={linkHovered} />
          </Canvas>
        </a>
      </div>
    </article>
  );
}
