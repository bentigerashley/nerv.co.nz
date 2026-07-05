import {
  MeshDistortMaterial,
  Float,
} from "@react-three/drei";

import { motion as motion3d } from "framer-motion-3d";

import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import { useFrame, useThree, MeshProps } from "@react-three/fiber";
import { useRef, forwardRef, Ref } from "react";

export default function Orb() {
  const orb = useRef<THREE.Mesh>(null);
  const vec = new THREE.Vector3();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    orb.current?.position.lerp(
      vec.set(
        (state.mouse.x * viewport.width) / 15,
        (state.mouse.y * viewport.height) / 15,
        0
      ),
      0.1
    );

    orb.current?.updateMatrixWorld();
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <hemisphereLight intensity={0.5} color="white" groundColor="black" />
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={0.08}
          radius={0.2}
          luminanceThreshold={0.55}
          luminanceSmoothing={0.99}
          height={300}
        />
        <Noise opacity={0.03} />
        <Vignette eskil={false} offset={0.2} darkness={0.65} />
      </EffectComposer>

      <motion3d.group>
        <Sphere
          ref={orb}
          color="#F2552C"
          amount={20}
          emissive="#F2552C"
          glow="#F2552C"
          size={0.18}
        />
      </motion3d.group>
    </>
  );
}

type SphereProps = {
  size: number;
  amount: number;
  color: string;
  emissive: string;
  glow: string;
};

const Sphere = forwardRef(
  (
    {
      size = 1,
      amount = 50,
      color = "white",
      emissive = "white",
      glow = "white",
      ...props
    }: SphereProps,
    ref
  ) => (
    <Float
      speed={1} // Animation speed, defaults to 1
      rotationIntensity={0.1} // XYZ rotation intensity, defaults to 1
      floatIntensity={0.1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
      floatingRange={[-0.1, 0.1]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
    >
      <motion3d.mesh ref={ref as Ref<MeshProps> | undefined} {...props}>
        <sphereGeometry args={[size, 64, 64]} />
        <MeshDistortMaterial
          transparent
          opacity={0.42}
          blending={THREE.NormalBlending}
          color={color}
          emissive="#F2552C"
          emissiveIntensity={0.2}
          toneMapped={false}
          distort={0.5}
          speed={2}
        />
      </motion3d.mesh>
    </Float>
  )
);
Sphere.displayName = "Sphere";
