"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Box,
  Plane,
  TransformControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Undo2,
  Redo2,
  Trash2,
  Plus,
  MoreVertical,
  Move,
  RotateCcw,
} from "lucide-react";
import { Room } from "./room";
import { DragPlane } from "./drag-plane";
import { InspectorInput } from "./inspector-input";

const furnitureTypes = [
  {
    name: "Chair",
    width: 0.6,
    height: 1,
    depth: 0.6,
    color: "#8B4513",
    isFBX: false,
  },
  {
    name: "Table",
    width: 1.2,
    height: 0.8,
    depth: 0.8,
    color: "#DEB887",
    isFBX: false,
  },
  {
    name: "Sofa",
    width: 2,
    height: 0.8,
    depth: 0.9,
    color: "#A52A2A",
    isFBX: false,
  },
  {
    name: "Lamp",
    width: 0.4,
    height: 1.5,
    depth: 0.4,
    color: "#F4A460",
    isFBX: false,
  },
  {
    name: "Shelf",
    width: 1.5,
    height: 2,
    depth: 0.4,
    color: "#8B4513",
    isFBX: false,
  },
  {
    name: "Cupboard",
    width: 1.2,
    height: 1.8,
    depth: 0.6,
    color: "#DEB887",
    isFBX: false,
  },
  {
    name: "Custom FBX",
    width: 1,
    height: 1,
    depth: 1,
    color: "#FFFFFF",
    isFBX: true,
    url: "/models/armchair-019.fbx",
  },
];

export default function RoomPlanner() {
  const [furniture, setFurniture] = useState([]);
  const [selectedFurniture, setSelectedFurniture] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState(null);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [transformMode, setTransformMode] = useState("translate");

  const furnitureRefs = useRef(furniture.map(() => useRef()));

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" && selectedFurniture !== null) {
        handleDeleteFurniture(selectedFurniture);
      }
      if (event.ctrlKey && event.key === "z") {
        undo();
      }
      if (event.ctrlKey && event.key === "y") {
        redo();
      }
      if (event.key === "r") {
        toggleTransformMode();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedFurniture, historyIndex, transformMode]);

  useEffect(() => {
    furnitureRefs.current = furniture.map((_, i) => furnitureRefs.current[i] || useRef());
  }, [furniture]);

  const toggleTransformMode = () => {
    setTransformMode((prevMode) =>
      prevMode === "translate" ? "rotate" : "translate"
    );
  };

  const handleDrop = useCallback(
    (position) => {
      if (selectedType) {
        handleAddFurniture(position);
      }
    },
    [selectedType]
  );

  const handleAddFurniture = (position = { x: 0, y: 0, z: 0 }) => {
    if (selectedType) {
      const existingNames = furniture
        .filter((item) => item.name.startsWith(selectedType.name))
        .map((item) => item.name);
      let newName = selectedType.name;
      let counter = 1;
      while (existingNames.includes(newName)) {
        newName = `${selectedType.name} ${counter}`;
        counter++;
      }

      const newFurniture = {
        ...selectedType,
        name: newName,
        position: [
          position.x,
          selectedType.height / 2 + position.y,
          position.z,
        ],
        rotation: [0, 0, 0],
      };
      const newFurnitureList = [...furniture, newFurniture];
      setFurniture(newFurnitureList);
      addToHistory(newFurnitureList);
      setSelectedType(null);
      setIsDragging(false);
      setDragPosition(null);
    }
  };

  const handleSelectFurniture = (index) => {
    setSelectedFurniture(index);
  };

  const handleUpdateFurniture = (index, updates) => {
    const updatedFurniture = furniture.map((item, i) =>
      i === index ? { ...item, ...updates } : item
    );
    setFurniture(updatedFurniture);
    addToHistory(updatedFurniture);
  };

  const handleTextureChange = (index, newTexture) => {
    handleUpdateFurniture(index, { texture: newTexture });
  };

  const addToHistory = (newState) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newState);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setFurniture(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setFurniture(history[historyIndex + 1]);
    }
  };

  const clearAll = () => {
    const emptyState = [];
    setFurniture(emptyState);
    addToHistory(emptyState);
  };

  const handleDeleteFurniture = (index) => {
    const newFurniture = furniture.filter((_, i) => i !== index);
    setFurniture(newFurniture);
    addToHistory(newFurniture);
    setSelectedFurniture(null);
  };

  return (
    <div className="w-full h-screen flex flex-col">
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="flex space-x-2">
          {furnitureTypes.map((type) => (
            <Button
              key={type.name}
              onClick={() => {
                setSelectedType(type);
                handleAddFurniture({ x: 0, y: 0, z: 0 });
              }}
              variant="outline"
            >
              <Plus className="mr-2 h-4 w-4" /> {type.name}
            </Button>
          ))}
        </div>
        <div className="flex space-x-2">
          <Button
            onClick={toggleTransformMode}
            variant={transformMode === "translate" ? "secondary" : "outline"}
            title="Toggle Transform Mode (Shortcut: R)"
          >
            {transformMode === "translate" ? (
              <Move className="h-4 w-4" />
            ) : (
              <RotateCcw className="h-4 w-4" />
            )}
          </Button>
          <Button onClick={undo} disabled={historyIndex <= 0}>
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button onClick={redo} disabled={historyIndex >= history.length - 1}>
            <Redo2 className="h-4 w-4" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  furniture from your room.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={clearAll}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex flex-1 h-screen">
        <div className="w-1/4 h-screen p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Room Structure</h2>
          <div className="space-y-2">
            <div className="font-semibold">Floor Room</div>
            <ul className="pl-4">
              {furniture.map((item, index) => (
                <li
                  key={index}
                  className={`cursor-pointer flex justify-between items-center ${
                    selectedFurniture === index ? "text-blue-500" : ""
                  }`}
                  onClick={() => handleSelectFurniture(index)}
                >
                  <span>{item.name}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        onSelect={() => handleDeleteFurniture(index)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-1/2 h-screen">
          <Canvas shadows camera={{ position: [5, 5, 5], fov: 75 }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} castShadow />
            <Room
              furniture={furniture}
              furnitureRefs={furnitureRefs.current}
              onSelectFurniture={handleSelectFurniture}
              selectedFurniture={selectedFurniture}
              onUpdateFurniture={handleUpdateFurniture}
              transformMode={transformMode}
            />
            <DragPlane onDrop={handleDrop} />
            <OrbitControls makeDefault />
          </Canvas>
        </div>
        <div className="w-1/4 h-screen p-4 bg-gray-100 overflow-y-auto">
          <h2 className="text-2xl font-bold mb-4">Inspector</h2>
          {selectedFurniture !== null && furniture[selectedFurniture] && (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <h3 className="text-lg font-semibold mb-2">
                  {furniture[selectedFurniture].name}
                </h3>
                {!furniture[selectedFurniture].isFBX && (
                  <div className="mb-4">
                    <Label htmlFor="color" className="text-sm font-medium">
                      Color
                    </Label>
                    <div className="flex items-center mt-1">
                      <Input
                        id="color"
                        type="color"
                        value={furniture[selectedFurniture].color}
                        onChange={(e) =>
                          handleUpdateFurniture(selectedFurniture, {
                            color: e.target.value,
                          })
                        }
                        className="w-10 h-10 p-1 mr-2"
                      />
                      <Input
                        type="text"
                        value={furniture[selectedFurniture].color}
                        onChange={(e) =>
                          handleUpdateFurniture(selectedFurniture, {
                            color: e.target.value,
                          })
                        }
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
                {furniture[selectedFurniture].isFBX && (
                  <div className="mb-4">
                    <Label htmlFor="texture" className="text-sm font-medium">
                      Texture
                    </Label>
                    <Input
                      id="texture"
                      type="text"
                      value={furniture[selectedFurniture].texture || ""}
                      onChange={(e) =>
                        handleTextureChange(selectedFurniture, e.target.value)
                      }
                      placeholder="Enter texture URL"
                      className="mt-1"
                    />
                  </div>
                )}
                <h4 className="text-sm font-semibold mb-2">Transform</h4>
                <InspectorInput
                  label="Position X"
                  value={furniture[selectedFurniture].position[0]}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, {
                      position: [
                        value,
                        furniture[selectedFurniture].position[1],
                        furniture[selectedFurniture].position[2],
                      ],
                    })
                  }
                  min={-5}
                  max={5}
                />
                <InspectorInput
                  label="Position Y"
                  value={furniture[selectedFurniture].position[1]}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, {
                      position: [
                        furniture[selectedFurniture].position[0],
                        value,
                        furniture[selectedFurniture].position[2],
                      ],
                    })
                  }
                  min={0}
                  max={5}
                />
                <InspectorInput
                  label="Position Z"
                  value={furniture[selectedFurniture].position[2]}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, {
                      position: [
                        furniture[selectedFurniture].position[0],
                        furniture[selectedFurniture].position[1],
                        value,
                      ],
                    })
                  }
                  min={-5}
                  max={5}
                />
                <InspectorInput
                  label="Rotation X"
                  value={furniture[selectedFurniture].rotation[0]}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, {
                      rotation: [
                        value,
                        furniture[selectedFurniture].rotation[1],
                        furniture[selectedFurniture].rotation[2],
                      ],
                    })
                  }
                  min={0}
                  max={Math.PI * 2}
                  step={0.01}
                />
                <InspectorInput
                  label="Rotation Y"
                  value={furniture[selectedFurniture].rotation[1]}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, {
                      rotation: [
                        furniture[selectedFurniture].rotation[0],
                        value,
                        furniture[selectedFurniture].rotation[2],
                      ],
                    })
                  }
                  min={0}
                  max={Math.PI * 2}
                  step={0.01}
                />
                <InspectorInput
                  label="Rotation Z"
                  value={furniture[selectedFurniture].rotation[2]}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, {
                      rotation: [
                        furniture[selectedFurniture].rotation[0],
                        furniture[selectedFurniture].rotation[1],
                        value,
                      ],
                    })
                  }
                  min={0}
                  max={Math.PI * 2}
                  step={0.01}
                />
                <h4 className="text-sm font-semibold mb-2 mt-4">Scale</h4>
                <InspectorInput
                  label="Width"
                  value={furniture[selectedFurniture].width}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, { width: value })
                  }
                  max={5}
                />
                <InspectorInput
                  label="Height"
                  value={furniture[selectedFurniture].height}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, { height: value })
                  }
                  max={5}
                />
                <InspectorInput
                  label="Depth"
                  value={furniture[selectedFurniture].depth}
                  onChange={(value) =>
                    handleUpdateFurniture(selectedFurniture, { depth: value })
                  }
                  max={5}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
