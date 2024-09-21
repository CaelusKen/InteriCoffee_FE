import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { FBXModel } from "./models/FBXModel";

export const Furniture = ({
  position,
  rotation,
  width,
  height,
  depth,
  color,
  onSelect,
  isSelected,
  isFBX,
  url,
  texture,
}) => {
  const mesh = useRef();

  useFrame(() => {
    if (mesh.current) {
      mesh.current.position.set(...position);
      mesh.current.rotation.set(...rotation);
      mesh.current.scale.set(width, height, depth);
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    onSelect();
  };

  return (
    <group ref={mesh} onClick={handleClick}>
      {isFBX ? (
        <FBXModel
          url={url}
          texture={texture}
          position={position}
          rotation={rotation}
          scale={[width, height, depth]}
        />
      ) : (
        <mesh>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} />
        </mesh>
      )}
    </group>
  );
};