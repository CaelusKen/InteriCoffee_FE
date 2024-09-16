"use client";

import React, { useState, useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";

export const FBXModel = ({ url, position, rotation, scale, onClick, onPointerOver, onPointerOut }) => {
    const [model, setModel] = useState(null);
    const groupRef = useRef()
  
    useEffect(() => {
      const loader = new FBXLoader()
      loader.load(
        url,
        (fbx) => {
          fbx.scale.set(0.01, 0.01, 0.01) // Adjust scale as needed
          setModel(fbx)
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
        },
        (error) => {
          console.error('An error happened', error)
        }
      )
    }, [url])
  
    useEffect(() => {
      if (groupRef.current) {
        groupRef.current.position.set(...position);
        groupRef.current.rotation.set(...rotation);
        groupRef.current.scale.set(...scale);
      }
    }, [position, rotation, scale]);
  
    return (
      <group
        ref={groupRef}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      >
        {model && <primitive object={model} />}
        {isSelected && <TransformControls object={groupRef} />}                                     
      </group>
    );
  };

