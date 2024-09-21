"use client";

import React, { useEffect, useRef } from "react";
import { useLoader, useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three';

export const FBXModel = ({ 
  url,
  texture,
  position,
  rotation,
  scale,
}) => {
  const fbx = useLoader(FBXLoader, url);
  const modelRef = useRef();

  useEffect(() => {
    if (fbx && modelRef.current) {
      modelRef.current.clear();
      const clone = fbx.clone();
      clone.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed

      if (texture) {
        const textureLoader = new THREE.TextureLoader();
        const loadedTexture = textureLoader.load(texture);
        clone.traverse((child) => {
          if (child.isMesh) {
            child.material.map = loadedTexture;
            child.material.needsUpdate = true;
          }
        });
      }

      modelRef.current.add(clone);
    }
  }, [fbx, texture]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.set(...position);
      modelRef.current.rotation.set(...rotation);
      modelRef.current.scale.set(...scale);
    }
  });

  return <group ref={modelRef} />;
};