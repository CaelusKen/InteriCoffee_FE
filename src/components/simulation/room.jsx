import React from 'react'
import { Furniture } from './furniture';
import {
    Box,
    Plane,
} from "@react-three/drei";

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
        <Plane rotation={[-Math.PI / 2, 0, 0]} args={[10, 10]} receiveShadow>
          <meshStandardMaterial color="#f0f0f0" />
        </Plane>
  
        <Box position={[0, 2.5, -5]} args={[10, 5, 0.1]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Box>
        <Box position={[-5, 2.5, 0]} args={[0.1, 5, 10]}>
          <meshStandardMaterial color="#e0e0e0" />
        </Box>
  
        {furniture.map((item, index) => (
          <Furniture
            key={index}
            position={item.position}
            rotation={item.rotation}
            scale={[item.width, item.height, item.depth]}
            color={item.color}
            onSelect={() => onSelectFurniture(index)}
            isSelected={selectedFurniture === index}
            onPositionChange={(newPosition) =>
              onUpdateFurniture(index, {
                position: [newPosition.x, newPosition.y, newPosition.z],
              })
            }
            onRotationChange={(newRotation) =>
              onUpdateFurniture(index, {
                rotation: [newRotation.x, newRotation.y, newRotation.z],
              })
            }
            transformMode={transformMode}
            isFBX={item.isFBX}
            url={item.url}
          />
        ))}
      </group>
    );
  };