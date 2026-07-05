import Image from "next/image";

import {
  motion,
  useMotionValue,
  MotionValue,
  useTransform,
  useSpring,
} from "framer-motion";
import { useRef, MouseEvent } from "react";

type Props = {};
export default function Stack({}: Props) {
  const badges = [
    "react.svg",
    "nextjs.svg",
    "nodejs.svg",
    "typescript.svg",
    "python.svg",
    "webflow.svg",
    "aws.svg",
    "firebase.svg",
    "shopify.svg",
    "docker.svg",
    "salesforce.svg",
  ];

  function handleMouse(
    x: MotionValue<number>,
    y: MotionValue<number>,
    event: MouseEvent
  ) {
    const eventTarget = event.target as HTMLElement;
    const rect = eventTarget.getBoundingClientRect();

    x.set((event.clientX - rect.left) * 4);
    y.set((event.clientY - rect.top) * 4);
  }

  const ref = useRef(null);

  return (
    <motion.div className="h-screen min-w-screen flex justify-center items-center">
      <div className="m-auto flex flex-col justify-center items-center">
        <h2 className="font-display uppercase mx-10 text-3xl md:text-4xl lg:text-6xl mb-16">
          tools in rotation.
        </h2>
        <motion.div
          ref={ref}
          className="flex justify-center items-center md:justify-start gap-8 max-w-xl md:max-w-2xl flex-wrap mx-4 md:ml-8"
        >
          {badges.map((badge, i) => {
            // eslint-disable-next-line
            const x = useMotionValue(200);
            // eslint-disable-next-line
            const y = useMotionValue(200);

            // eslint-disable-next-line
            const rotateX = useTransform(y, [0, 400], [45, -45]);
            // eslint-disable-next-line
            const rotateY = useTransform(x, [0, 400], [-45, 45]);

            // eslint-disable-next-line
            const springX = useSpring(rotateX, {
              stiffness: 1000,
              damping: 10,
            });
            // eslint-disable-next-line
            const springY = useSpring(rotateY, {
              restDelta: 0,
            });
            return (
              <motion.div
                whileHover={{ scale: 1.2 }}
                onHoverEnd={() => {
                  x.set(200);
                  y.set(200);
                }}
                onMouseMove={(e) => handleMouse(x, y, e)}
                key={i}
                style={{
                  perspective: 400,
                }}
                className={`signal-panel rounded p-3 ${
                  i === 0 ? "md:ml-[calc(100%/12)]" : ""
                }`}
              >
                <motion.div
                  style={{
                    rotateX: springX,
                    rotateY: springY,
                  }}
                  className="relative w-12 h-12 md:w-14 md:h-14"
                >
                  <Image
                    alt={badge}
                    className="object-scale-down"
                    fill
                    src={"/assets/logos/" + badge}
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}
