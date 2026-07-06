import { Scroll } from "@react-three/drei";
import Laptop from "../Hero/Laptop";

import { Suspense } from "react";
export default function Items() {
  return (
    <Scroll>
      <pointLight position={[10, 10, 10]} intensity={0.35} />
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
    </Scroll>
  );
}
