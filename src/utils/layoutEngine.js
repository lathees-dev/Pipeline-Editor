import dagre from "dagre";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

export function getLayoutedElements(nodes, edges, direction = "TB") {
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const layoutedNodes = nodes.map((node) => {
    const nodeWithPos = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPos.x - nodeWidth / 2,
        y: nodeWithPos.y - nodeHeight / 2,
      },
      data: { ...node.data },
    };
  });

  return { nodes: layoutedNodes, edges };
}
