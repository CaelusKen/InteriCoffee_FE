import React from "react";
import { Furniture } from "./furniture";
import { Box, Plane } from "@react-three/drei";

export const Room = ({
  furniture,
  onSelectFurniture,
  selectedFurniture,
  onUpdateFurniture,
  transformMode,
}) => {
  const handleCanvasClick = (event) => {
    if (event.object.name !== "dragPlane") {
      onSelectFurniture(null);
    }
  };

  return (
    <group onClick={handleCanvasClick}>
      <Plane 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[10, 10]} 
        receiveShadow
      >
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>

      {furniture.map((item, index) => (
        <Furniture
          key={index}
          {...item}
          onSelect={() => onSelectFurniture(index)}
          isSelected={selectedFurniture === index}
          onPositionChange={(newPosition) =>
            onUpdateFurniture(index, { position: newPosition })
          }
          onRotationChange={(newRotation) =>
            onUpdateFurniture(index, { rotation: newRotation })
          }
          transformMode={transformMode}
        />
      ))}
    </group>
  );
};
