import { useEffect, useState, useCallback } from "react";
import ReactFlow, { useReactFlow, ReactFlowProvider, Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import useDagValidation from "./hooks/useDagValidation";
import { useGraphHandlers } from "./hooks/useGraphHandlers";
import { getLayoutedElements } from "./utils/layoutEngine";
import StatusBar from "./components/StatusBar";
import JsonPreview from "./components/JsonPreview";
import Toolbar from "./components/Toolbar";

function DAGEditor() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const [showInput, setShowInput] = useState(false);
  const [newNodeLabel, setNewNodeLabel] = useState("");

  const {
    createNode, onConnect, onNodesChange, onEdgesChange } = useGraphHandlers({
    setNodes,
    setEdges,
  });

  const handleNodeCreate = () => {
    if (!newNodeLabel.trim()) return;
    createNode(newNodeLabel);
    setNewNodeLabel("");
    setShowInput(false);
  };
  
  const { fitView } = useReactFlow();
  const layoutGraph = useCallback(() => {
    const layouted = getLayoutedElements(nodes, edges, "TB");
    setNodes([...layouted.nodes]);
    setEdges([...layouted.edges]);
    setTimeout(() => fitView({ duration: 800 }), 0); 
  }, [nodes, edges, setNodes, setEdges, fitView]);
  

  const dagStatus = useDagValidation(nodes, edges);

  useEffect(() => {
    const handleDelete = (e) => {
      if (e.key === "Delete") {
        setNodes(nodes.filter((n) => !n.selected));
        setEdges(edges.filter((e) => !e.selected));
      }
    };
    window.addEventListener("keydown", handleDelete);
    return () => window.removeEventListener("keydown", handleDelete);
  }, [nodes, edges]);

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

      {/* Toolbar */}
      <Toolbar onAddNode={() => setShowInput(true)} onLayout={layoutGraph} />

      {/* Status + JSON */}
      <StatusBar isValid={dagStatus.valid} reason={dagStatus.reason} />
      <JsonPreview nodes={nodes} edges={edges} />

      {/* Modal Node Input */}
      {showInput && (
        <div style={backdropStyle}>
          <div style={modalCard}>
            <h2 style={modalHeader}>Create New Node</h2>
            <input
              type="text"
              value={newNodeLabel}
              onChange={(e) => setNewNodeLabel(e.target.value)}
              placeholder="Enter node label"
              autoFocus
              style={modalInput}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleNodeCreate();
                }
              }}
            />
            <div style={modalFooter}>
              <button onClick={handleNodeCreate} style={modalAddBtn}>
                Add
              </button>
              <button
                onClick={() => setShowInput(false)}
                style={modalCancelBtn}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const backdropStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  height: "100vh",
  width: "100vw",
  backgroundColor: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalCard = {
  background: "#fff",
  borderRadius: "10px",
  padding: "24px 20px",
  width: "320px",
  boxShadow: "0 20px 30px rgba(0,0,0,0.3)",
  animation: "fadeIn 0.2s ease-in-out",
};

const modalHeader = {
  margin: 0,
  fontSize: "20px",
  color: "#111827",
  marginBottom: "16px",
  textAlign: "center",
};

const modalInput = {
  width: "90%",
  padding: "10px",
  fontSize: "14px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  outline: "none",
  marginBottom: "20px",
};

const modalFooter = {
  display: "flex",
  justifyContent: "flex-end",
  gap: "10px",
};

const modalAddBtn = {
  padding: "8px 14px",
  background: "#4f46e5",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  fontSize: "14px",
  cursor: "pointer",
};

const modalCancelBtn = {
  ...modalAddBtn,
  background: "#e5e7eb",
  color: "#111827",
};


export default function App() {
  return (
    <ReactFlowProvider>
      <DAGEditor />
    </ReactFlowProvider>
  );
}
