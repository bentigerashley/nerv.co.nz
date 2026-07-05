import {
  Billboard,
  Bounds,
  MeshDistortMaterial,
  Float,
  useScroll,
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
import { LayerMaterial, Depth } from "lamina";

export default function Orb() {
  const data = useScroll();

  const orb = useRef<THREE.Mesh>(null);
  const vec = new THREE.Vector3();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    const SCALE = 1.2;
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
          intensity={0.45}
          radius={0.65}
          luminanceThreshold={0.2}
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
          glow="#F6B13D"
          size={0.72}
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
        <sphereGeometry args={[size, 128, 128]} />
        <MeshDistortMaterial
          transparent={true}
          blending={THREE.MultiplyBlending}
          emissive="#F2552C"
          emissiveIntensity={0}
          toneMapped={false}
          distort={0.5}
          speed={2}
        />
        <Glow
          scale={size * 1.2}
          near={-2}
          far={1.4}
          color={glow || emissive || color}
        />
      </motion3d.mesh>
    </Float>
  )
);
Sphere.displayName = "Sphere";
type GlowProps = {
  color?: string;
  scale?: number;
  near?: number;
  far?: number;
};

export const Glow = ({
  color,
  scale = 0.5,
  near = -2,
  far = 1.4,
}: GlowProps) => (
  <Billboard>
    <mesh>
      <circleGeometry args={[2 * scale, 256]} />

      <LayerMaterial
        transparent
        depthWrite={false}
        blending={THREE.CustomBlending}
        blendEquation={THREE.AddEquation}
        blendSrc={THREE.SrcAlphaFactor}
        blendDst={THREE.DstAlphaFactor}
      >
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="normal"
          near={near * scale}
          far={far * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={0.5}
          mode="add"
          near={-40 * scale}
          far={far * 1.2 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-15 * scale}
          far={far * 0.7 * scale}
          origin={[0, 0, 0]}
        />
        <Depth
          colorA={color}
          colorB="black"
          alpha={1}
          mode="add"
          near={-10 * scale}
          far={far * 0.68 * scale}
          origin={[0, 0, 0]}
        />
      </LayerMaterial>
    </mesh>
  </Billboard>
);
