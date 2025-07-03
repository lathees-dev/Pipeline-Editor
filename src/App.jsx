import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  ReactFlowProvider,
  Background,
  Controls,
  applyEdgeChanges,
  applyNodeChanges,
  useReactFlow,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";
import { nanoid } from "nanoid";
import useDagValidation from "./hooks/useDagValidation";
import { getLayoutedElements } from "./utils/layoutEngine";

const initialNodes = [];
const initialEdges = [];

function DAGEditor() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const dagStatus = useDagValidation(nodes, edges);
  const { fitView } = useReactFlow();

  const onLayout = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges, "TB"); // 'LR' = left-right, 'TB' = top-bottom
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
    fitView();
  }, [nodes, edges, setNodes, setEdges, fitView]);


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
      <button
        onClick={onLayout}
        style={{
          position: "absolute",
          top: 60,
          left: 20,
          zIndex: 1000,
          padding: "8px 12px",
          background: "#10b981",
          color: "#fff",
          border: "none",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Auto Layout
      </button>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 20,
          zIndex: 1000,
          background: dagStatus.valid ? "#d1fae5" : "#fee2e2",
          color: dagStatus.valid ? "#065f46" : "#b91c1c",
          padding: "8px 12px",
          borderRadius: "6px",
          fontWeight: 500,
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        {dagStatus.reason}
      </div>
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1000,
          background: "#f9fafb",
          border: "1px solid #e5e7eb",
          padding: "8px 12px",
          borderRadius: 6,
          width: 300,
          maxHeight: "80vh",
          overflowY: "auto",
          fontSize: "12px",
          fontFamily: "monospace",
          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
        }}
      >
        <strong>Graph JSON</strong>
        <pre style={{ whiteSpace: "pre-wrap", marginTop: 8 }}>
          {JSON.stringify({ nodes, edges }, null, 2)}
        </pre>
      </div>
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
