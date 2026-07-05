import { Scroll, Float } from "@react-three/drei";

import Cup from "../Stack/Cup";
import EmptyCup from "../Socials/EmptyCup";
import Laptop from "../Hero/Laptop";

import { useThree } from "@react-three/fiber";
import { Suspense } from "react";
export default function Items() {
  const { viewport } = useThree((state) => state);
  return (
    <Scroll>
      <Float
        rotationIntensity={0.08}
        floatingRange={[-0.1, 0.1]}
        floatIntensity={0.5}
        speed={2}
      >
        <Cup position={[1.2, -viewport.height * 2, -0.1]} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <Suspense fallback={null}>
          <group
            renderOrder={99}
            rotation={[1, 0.2, -0.2]}
            scale={0.1}
            position={[-0.5, 0, -1]}
          >
            <Laptop position={[-0.5, 0.25, -0.61]} />
          </group>
        </Suspense>
        <EmptyCup position={[-0.8, -viewport.height * 4 + 0.1, -0.1]} />
      </Float>
    </Scroll>
  );
}
