import { Float, Scroll, useScroll } from "@react-three/drei";
import Laptop from "../Hero/Laptop";

import { useFrame, useThree } from "@react-three/fiber";
import { lazy, Suspense, useEffect, useRef, useState } from "react";

const Cup = lazy(() => import("../Stack/Cup"));
const EmptyCup = lazy(() => import("../Socials/EmptyCup"));

export default function Items() {
  const { viewport } = useThree((state) => state);
  const scroll = useScroll();
  const loaded = useRef({ cup: false, emptyCup: false });
  const [showCup, setShowCup] = useState(false);
  const [showEmptyCup, setShowEmptyCup] = useState(false);

  useEffect(() => {
    const cupTimer = window.setTimeout(() => {
      void import("../Stack/Cup");
    }, 300);
    const emptyCupTimer = window.setTimeout(() => {
      void import("../Socials/EmptyCup");
    }, 1800);

    return () => {
      window.clearTimeout(cupTimer);
      window.clearTimeout(emptyCupTimer);
    };
  }, []);

  useFrame(() => {
    if (!loaded.current.cup && scroll.offset > 0.12) {
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
          speed={1.1}
          rotationIntensity={0.08}
          floatIntensity={0.28}
        >
          <group
            renderOrder={99}
            rotation={[1, 0.2, -0.2]}
            scale={0.19}
            position={[-0.5, 0, -1]}
          >
            <Laptop position={[-0.5, 0.25, -0.61]} />
          </group>
        </Float>
      </Suspense>
      {showCup && (
        <Suspense fallback={null}>
          <Float
            speed={0.7}
            rotationIntensity={0.04}
            floatIntensity={0.18}
            floatingRange={[-0.05, 0.05]}
          >
            <Cup position={[1.4, -viewport.height * 2, -0.1]} />
          </Float>
        </Suspense>
      )}
      {showEmptyCup && (
        <Suspense fallback={null}>
          <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.2}>
            <EmptyCup position={[-0.9, -viewport.height * 4 + 0.1, -0.1]} />
          </Float>
        </Suspense>
      )}
    </Scroll>
  );
}
