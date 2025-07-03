import React, { useState } from "react";
import ReactFlow, { ReactFlowProvider, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

const initialNodes = [];
const initialEdges = [];

function DAGEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={setNodes}
        onEdgesChange={setEdges}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>

      <button
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
        onClick={() => {
          alert("Add Node logic goes here");
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
