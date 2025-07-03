// Displays a real-time JSON dump of current DAG nodes and edges
export default function JsonPreview({ nodes, edges }) {
  return (
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
  );
}
