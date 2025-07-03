import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";

const initialNodes = [];
const initialEdges = [];

function DAGEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  // Delete selected nodes/edges on Delete key
  useEffect(() => {
    const handleDelete = (event) => {
      if (event.key === "Delete") {
        const updatedNodes = nodes.filter((node) => !node.selected);
        const updatedEdges = edges.filter((edge) => !edge.selected);
        setNodes(updatedNodes);
        setEdges(updatedEdges);
      }
    };

    window.addEventListener("keydown", handleDelete);
    return () => window.removeEventListener("keydown", handleDelete);
  }, [nodes, edges]);

  // Add node with label and random position
  const addNode = useCallback(() => {
    const label = prompt("Enter node label");
    if (!label) return;

    const id = nanoid(6);
    const newNode = {
      id,
      data: { label },
      position: {
        x: Math.random() * 400 + 100,
        y: Math.random() * 400 + 100,
      },
      type: "default",
    };

    setNodes((nds) => [...nds, newNode]);
  }, []);

  // Edge validation and connect
  const onConnect = useCallback((params) => {
    const { source, target } = params;

    if (source === target) {
      alert("Invalid: Self-loop not allowed.");
      return;
    }

    setEdges((eds) => addEdge(params, eds));
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
        onConnect={onConnect}
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
