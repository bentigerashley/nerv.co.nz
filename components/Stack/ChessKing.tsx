import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
};

export default function ChessKing({ position }: Props) {
  const group = useRef<THREE.Group>(null);

  const bodyGeometry = useMemo(() => {
    const profile = [
      [0, -1.55],
      [0.62, -1.55],
      [0.78, -1.38],
      [0.78, -1.22],
      [0.52, -1.08],
      [0.44, -0.88],
      [0.5, -0.68],
      [0.33, -0.48],
      [0.26, 0.24],
      [0.36, 0.56],
      [0.48, 0.72],
      [0.46, 0.92],
      [0.3, 1.02],
      [0.22, 1.18],
      [0.28, 1.34],
      [0.42, 1.48],
      [0.34, 1.64],
      [0.16, 1.7],
      [0, 1.72],
    ].map(([x, y]) => new THREE.Vector2(x, y));

    const geometry = new THREE.LatheGeometry(profile, 40);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const orangeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F2552C",
        emissive: "#8f210f",
        emissiveIntensity: 0.55,
        roughness: 0.32,
        metalness: 0.28,
      }),
    []
  );

  const highlightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#F2552C",
        emissiveIntensity: 0.22,
        roughness: 0.22,
        metalness: 0.4,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;

    const elapsed = clock.getElapsedTime();
    group.current.rotation.y = -0.78 + Math.sin(elapsed * 0.32) * 0.12;
    group.current.rotation.z = -0.08 + Math.sin(elapsed * 0.42) * 0.025;
    group.current.position.y = position[1] + Math.sin(elapsed * 0.55) * 0.08;
  });

  return (
    <group
      ref={group}
      position={new THREE.Vector3(position[0], position[1], position[2])}
      rotation={[0.16, -0.78, -0.08]}
      scale={0.68}
      dispose={null}
    >
      <mesh geometry={bodyGeometry} material={orangeMaterial} />
      <mesh material={highlightMaterial} position={[0, 1.9, 0]}>
        <boxGeometry args={[0.2, 0.66, 0.13]} />
      </mesh>
      <mesh material={highlightMaterial} position={[0, 2.02, 0]}>
        <boxGeometry args={[0.56, 0.16, 0.13]} />
      </mesh>
      <pointLight color="#F2552C" intensity={0.8} distance={4.5} />
    </group>
  );
}
