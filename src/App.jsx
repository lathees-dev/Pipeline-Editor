// src/App.js
import React, { useState, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";

const initialNodes = [];
const initialEdges = [];

function DAGEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  const addNode = useCallback(() => {
    const label = prompt("Enter node label");
    if (!label) return;

    const id = nanoid(6);

    const newNode = {
      id,
      position: {
        x: Math.random() * 250 + 100,
        y: Math.random() * 250 + 100,
      },
      data: { label: label },
      type: "default",
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <button
        onClick={addNode}
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          zIndex: 1000,
          padding: "8px 12px",
          background: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        + Add Node
      </button>
    </div>
  );
}

export default function App() {
  return (
    <ReactFlowProvider>
      <DAGEditor />
    </ReactFlowProvider>
  );
}
