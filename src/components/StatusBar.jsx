// Displays DAG validity status with contextual background color
export default function StatusBar({ isValid, reason }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 50,
        zIndex: 1000,
        background: isValid ? "#d1fae5" : "#fee2e2",
        color: isValid ? "#065f46" : "#b91c1c",
        padding: "8px 12px",
        borderRadius: "6px",
        fontWeight: 500,
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      {reason}
    </div>
  );
}
