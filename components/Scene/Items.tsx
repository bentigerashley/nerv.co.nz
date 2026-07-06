import { Float, Scroll, useScroll } from "@react-three/drei";
import Laptop from "../Hero/Laptop";

import { useFrame, useThree } from "@react-three/fiber";
import { lazy, Suspense, useRef, useState } from "react";

const Cup = lazy(() => import("../Stack/Cup"));
const EmptyCup = lazy(() => import("../Socials/EmptyCup"));

export default function Items() {
  const { viewport } = useThree((state) => state);
  const scroll = useScroll();
  const loaded = useRef({ cup: false, emptyCup: false });
  const [showCup, setShowCup] = useState(false);
  const [showEmptyCup, setShowEmptyCup] = useState(false);

  useFrame(() => {
    if (!loaded.current.cup && scroll.offset > 0.2) {
      loaded.current.cup = true;
      setShowCup(true);
    }
    if (!loaded.current.emptyCup && scroll.offset > 0.65) {
      loaded.current.emptyCup = true;
      setShowEmptyCup(true);
    }
  });

  return (
    <Scroll>
      <pointLight position={[10, 10, 10]} intensity={0.35} />
      <Suspense fallback={null}>
        <Float
          speed={1.5}
          rotationIntensity={0.08}
          floatIntensity={0.4}
        >
          <group
            renderOrder={99}
            rotation={[1, 0.2, -0.2]}
            scale={0.14}
            position={[-0.5, 0, -1]}
          >
            <Laptop position={[-0.5, 0.25, -0.61]} />
          </group>
        </Float>
      </Suspense>
      {showCup && (
        <Suspense fallback={null}>
          <Float speed={1.4} rotationIntensity={0.08} floatIntensity={0.45}>
            <Cup position={[1.2, -viewport.height * 2, -0.1]} />
          </Float>
        </Suspense>
      )}
      {showEmptyCup && (
        <Suspense fallback={null}>
          <Float speed={1.3} rotationIntensity={0.08} floatIntensity={0.4}>
            <EmptyCup position={[-0.8, -viewport.height * 4 + 0.1, -0.1]} />
          </Float>
        </Suspense>
      )}
    </Scroll>
  );
}
