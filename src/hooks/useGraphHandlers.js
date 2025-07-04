import { useCallback } from "react";
import { nanoid } from "nanoid";
import { addEdge, applyEdgeChanges, applyNodeChanges } from "reactflow";

// Custom hook for handling node and edge interactions in the DAG editor
export function useGraphHandlers({ setNodes, setEdges }) {
  const createNode = useCallback(
    (label) => {
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
    },
    [setNodes]
  );
  // Connects two nodes with an edge, optionally marking invalid connections
  const onConnect = useCallback(
    (params) => {
      const { source, target } = params;

      const isSelfLoop = source === target;

      const newEdge = {
        ...params,
        type: "default",
        style: { stroke: isSelfLoop ? "red" : "" },
        markerEnd: {
          type: "arrowclosed",
          color: isSelfLoop ? "red" : "",
        },
        data: { isInvalid: isSelfLoop },
      };

      if (isSelfLoop) {
        alert("Invalid: Self-loop not allowed.");
      }

      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Handles drag/drop, move, resize, select on nodes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );

  // Handles edge updates (e.g., deletion or label changes)
  const onEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );

  return { createNode, onConnect, onNodesChange, onEdgesChange };
}
