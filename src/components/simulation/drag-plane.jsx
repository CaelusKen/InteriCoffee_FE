import React from 'react'
import { Plane } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from "three";

export const DragPlane = ({ onDrop }) => {
    const { camera, mouse, scene } = useThree();
    const raycaster = new THREE.Raycaster();
  
    useFrame(() => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children);
      if (intersects.length > 0) {
        const intersect = intersects.find((i) => i.object.name === "dragPlane");
        if (intersect) {
          onDrop(intersect.point);
        }
      }
    });
  
    return (
      <Plane
        args={[100, 100]}
        rotation={[-Math.PI / 2, 0, 0]}
        visible={false}
        name="dragPlane"
      />
    );
}