import { useGLTF, GradientTexture, Bounds, Float } from "@react-three/drei";
import { useState, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Mesh, Vector3, Quaternion } from "three";
import * as THREE from "three";
type Props = {
  hovered: boolean;
};
export default function LinkModel({ hovered }: Props) {
  const { nodes, materials } = useGLTF("/models/link.gltf");
  // const [hovered, hover] = useState(false);
  const link = useRef<Mesh>(null);
  const vec = new Vector3();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    const SCALE = 1.2;
    if (hovered) {
      link.current?.position.lerp(
        vec.set(
          (state.mouse.x * viewport.width) / 10,
          (state.mouse.y * viewport.height) / 10,
          0
        ),
        0.1
      );
      link.current?.scale.lerp(vec.set(SCALE, SCALE, SCALE), 0.1);
    } else {
      link.current?.scale.lerp(vec.set(1.0, 1.0, 1.0), 0.1);
    }
    link.current?.updateMatrixWorld();
  });

  return (
    <>
      <Bounds fit observe damping={6} margin={1.0}>
        <Float
          speed={2} // Animation speed, defaults to 1
          rotationIntensity={2} // XYZ rotation intensity, defaults to 1
          floatIntensity={1} // Up/down float intensity, works like a multiplier with floatingRange,defaults to 1
          floatingRange={[-0.2, 0.2]} // Range of y-axis values the object will float within, defaults to [-0.1,0.1]
        >
          <group dispose={null}>
            <mesh
              ref={link}
              castShadow
              receiveShadow
              geometry={(nodes.Plane001 as THREE.Mesh).geometry}
              position={[0, 0.01, 0.03]}
              rotation={[1.56, -0.78, 0.75]}
              // onPointerOver={() => hover(true)}
              // onPointerOut={() => hover(false)}
            >
              <meshBasicMaterial>
                <GradientTexture
                  stops={[0.2, 0.5, 0.8]} // As many stops as you want
                  colors={["#693B93", "#E06CB4", "#693B93"]} // Colors need to match the number of stops
                  size={200} // Size is optional, default = 1024
                />
              </meshBasicMaterial>
            </mesh>
          </group>
        </Float>
      </Bounds>
    </>
  );
}

useGLTF.preload("/models/link.gltf");
