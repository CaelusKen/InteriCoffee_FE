import React from "react";
import { Furniture } from "./furniture";
import { Plane, TransformControls } from "@react-three/drei";

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

  const handleFurnitureUpdate = (index, updates) => {
    onUpdateFurniture(index, updates);
  };

  return (
    <group onClick={handleCanvasClick}>
      <Plane 
        rotation={[-Math.PI / 2, 0, 0]} 
        args={[10, 10]} 
        receiveShadow
        name="dragPlane"
      >
        <meshStandardMaterial color="#f0f0f0" />
      </Plane>

      {furniture.map((item, index) => (
        <React.Fragment key={index}>
          <Furniture
            {...item}
            onSelect={() => onSelectFurniture(index)}
            isSelected={selectedFurniture === index}
          />
          {selectedFurniture === index && (
            <TransformControls
              object={item.ref}
              mode={transformMode}
              onObjectChange={(event) => {
                const { position, rotation, scale } = event.target.object;
                handleFurnitureUpdate(index, {
                  position: [position.x, position.y, position.z],
                  rotation: [rotation.x, rotation.y, rotation.z],
                  width: scale.x,
                  height: scale.y,
                  depth: scale.z,
                });
              }}
            />
          )}
        </React.Fragment>
      ))}
    </group>
  );
};