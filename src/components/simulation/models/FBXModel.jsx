"use client";

import React, { useState, useEffect, useRef } from "react";
import { TransformControls } from "@react-three/drei";
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'
import * as THREE from 'three';
import { useLoader } from '@react-three/fiber';

export const FBXModel = ({ 
  url,
  isSelected,
  ...props
}) => {
  const fbx = useLoader(FBXLoader, url);
  const modelRef = useRef();

  useEffect(() => {
    if (fbx && modelRef.current) {
      modelRef.current.clear();
      const clone = fbx.clone();
      clone.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
      modelRef.current.add(clone);
    }
  }, [fbx]);

  return (
    <group ref={modelRef} {...props} />
  );
};

