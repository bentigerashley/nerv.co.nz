import { useFrame, useThree } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  position: [number, number, number];
};

export default function ChessKing({ position }: Props) {
  const group = useRef<THREE.Group>(null);
  const scroll = useScroll();
  const { viewport } = useThree((state) => state);

  const bodyGeometry = useMemo(() => {
    const anchors = [
      [0.0, -1.58],
      [0.5, -1.58],
      [0.66, -1.52],
      [0.8, -1.36],
      [0.73, -1.2],
      [0.5, -1.1],
      [0.43, -0.92],
      [0.5, -0.74],
      [0.39, -0.56],
      [0.3, -0.34],
      [0.25, 0.24],
      [0.34, 0.52],
      [0.48, 0.7],
      [0.45, 0.9],
      [0.29, 1.02],
      [0.2, 1.18],
      [0.28, 1.34],
      [0.42, 1.48],
      [0.35, 1.62],
      [0.16, 1.7],
      [0.0, 1.74],
    ].map(([x, y]) => new THREE.Vector2(x, y));

    const curve = new THREE.SplineCurve(anchors);
    const profile = curve.getPoints(180);
    const geometry = new THREE.LatheGeometry(profile, 128);
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const crossGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.1, -0.34);
    shape.lineTo(0.1, -0.34);
    shape.lineTo(0.1, -0.08);
    shape.lineTo(0.31, -0.08);
    shape.lineTo(0.31, 0.08);
    shape.lineTo(0.1, 0.08);
    shape.lineTo(0.1, 0.34);
    shape.lineTo(-0.1, 0.34);
    shape.lineTo(-0.1, 0.08);
    shape.lineTo(-0.31, 0.08);
    shape.lineTo(-0.31, -0.08);
    shape.lineTo(-0.1, -0.08);
    shape.closePath();

    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.14,
      bevelEnabled: true,
      bevelSegments: 8,
      bevelSize: 0.025,
      bevelThickness: 0.025,
      curveSegments: 16,
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  const orangeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#F2552C",
        emissive: "#8f210f",
        emissiveIntensity: 0.42,
        roughness: 0.18,
        metalness: 0.36,
      }),
    []
  );

  const highlightMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#ffffff",
        emissive: "#F2552C",
        emissiveIntensity: 0.2,
        roughness: 0.18,
        metalness: 0.44,
      }),
    []
  );

  useFrame(({ clock }) => {
    if (!group.current) return;

    const elapsed = clock.getElapsedTime();
    const toolsOffset = 0.5;
    const distanceFromTools = scroll.offset - toolsOffset;
    const holdWindow = 0.32;
    const holdStrength =
      Math.max(0, 1 - Math.abs(distanceFromTools) / holdWindow) ** 2;
    const scrollCounterMotion =
      distanceFromTools * viewport.height * 0.32 * holdStrength;

    group.current.rotation.y = -0.78 + Math.sin(elapsed * 0.32) * 0.12;
    group.current.rotation.z = -0.08 + Math.sin(elapsed * 0.42) * 0.025;
    group.current.position.y =
      position[1] + scrollCounterMotion +
      Math.sin(elapsed * 0.55) * 0.08;
  });

  return (
    <group
      ref={group}
      position={new THREE.Vector3(position[0], position[1], position[2])}
      rotation={[0.16, -0.78, -0.08]}
      scale={0.28}
      dispose={null}
    >
      <mesh geometry={bodyGeometry} material={orangeMaterial} />
      <mesh
        geometry={crossGeometry}
        material={highlightMaterial}
        position={[0, 1.98, 0]}
      />
      <pointLight color="#F2552C" intensity={0.5} distance={3.2} />
    </group>
  );
}
