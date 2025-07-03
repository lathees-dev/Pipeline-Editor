import { useMemo } from "react";

// DAG validation logic
export default function useDagValidation(nodes, edges) {
  return useMemo(() => {
    const nodeIds = nodes.map((n) => n.id);

    // 1. Check minimum node count
    if (nodes.length < 2)
      return { valid: false, reason: "Must have at least 2 nodes" };

    // 2. Check all nodes connected
    const connectedNodeIds = new Set();
    edges.forEach((edge) => {
      connectedNodeIds.add(edge.source);
      connectedNodeIds.add(edge.target);
    });
    const allConnected = nodeIds.every((id) => connectedNodeIds.has(id));
    if (!allConnected)
      return { valid: false, reason: "All nodes must be connected" };

    // 3. Check for self-loops
    if (edges.some((e) => e.source === e.target)) {
      return { valid: false, reason: "Self-loops are not allowed" };
    }

    // 4. Check for cycles using DFS
    const adj = {};
    nodes.forEach((n) => (adj[n.id] = []));
    edges.forEach((e) => adj[e.source].push(e.target));

    const visited = {};
    const inStack = {};

    const hasCycle = (nodeId) => {
      if (!visited[nodeId]) {
        visited[nodeId] = true;
        inStack[nodeId] = true;

        for (let neighbor of adj[nodeId]) {
          if (!visited[neighbor] && hasCycle(neighbor)) return true;
          if (inStack[neighbor]) return true;
        }
      }
      inStack[nodeId] = false;
      return false;
    };

    for (let id of nodeIds) {
      if (hasCycle(id))
        return { valid: false, reason: "Graph contains a cycle" };
    }

    return { valid: true, reason: "Valid DAG" };
  }, [nodes, edges]);
}
