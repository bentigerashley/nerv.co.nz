import { Scroll, Float } from "@react-three/drei";

import ChessKing from "../Stack/ChessKing";
import Laptop from "../Hero/Laptop";

import { useThree } from "@react-three/fiber";
import { Suspense } from "react";
export default function Items() {
  const { viewport } = useThree((state) => state);
  return (
    <Scroll>
      <Float
        rotationIntensity={0}
        floatingRange={[-0.1, 0.1]}
        floatIntensity={0.5}
        speed={2}
      >
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
      </Float>
      <Float
        rotationIntensity={0.05}
        floatingRange={[-0.04, 0.04]}
        floatIntensity={0.2}
        speed={0.65}
      >
        <ChessKing position={[1.45, -viewport.height * 2 + 0.55, -0.15]} />
      </Float>
    </Scroll>
  );
}
