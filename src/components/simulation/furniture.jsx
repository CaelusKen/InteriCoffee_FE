import React, { useState, useRef, useCallback } from "react";
import { FBXModel } from "./models/FBXModel";
import { Box, TransformControls } from "@react-three/drei";

export const Furniture = ({
    position,
    rotation,
    scale,
    color,
    onSelect,
    isSelected,
    onPositionChange,
    onRotationChange,
    transformMode,
    isFBX,
    url,
  }) => {
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);
  
    const handleChange = useCallback(
      (event) => {
        if (event.target.object.position && transformMode === "translate") {
          onPositionChange(event.target.object.position);
        }
        if (event.target.object.rotation && transformMode === "rotate") {
          onRotationChange(event.target.object.rotation);
        }
      },
      [onPositionChange, onRotationChange, transformMode]
    );
  
    const commonProps = {
      onClick: (e) => {
        e.stopPropagation();
        onSelect();
      },
      onPointerOver: (e) => {
        e.stopPropagation();
        setHovered(true);
      },
      onPointerOut: (e) => {
        e.stopPropagation();
        setHovered(false);
      },
    };
  
    return (
      <group>
        {isFBX ? (
          <FBXModel
            url={url}
            position={position}
            rotation={rotation}
            scale={scale}
            {...commonProps}
          />
        ) : (
          <Box
            ref={mesh}
            position={position}
            rotation={rotation}
            scale={scale}
            {...commonProps}
          >
            <meshStandardMaterial color={hovered ? "#ff0000" : color} />
          </Box>
        )}
        {isSelected && !isFBX && (
          <TransformControls object={mesh} mode={transformMode} onObjectChange={handleChange} />
        )}
      </group>
    );
  };