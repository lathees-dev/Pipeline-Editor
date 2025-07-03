import { FaPlus, FaProjectDiagram } from "react-icons/fa";
import { Tooltip } from "react-tooltip";

// Toolbar component for adding nodes and auto-layout functionality
export default function Toolbar({ onAddNode, onLayout }) {
  return (
    <>
      <button
        data-tooltip-id="main-tooltip"
        data-tooltip-content="Add Node"
        onClick={onAddNode}
        style={btnStyle(20)}
      >
        <FaPlus size={14} />
      </button>

      <button
        data-tooltip-id="main-tooltip"
        data-tooltip-content="Auto Layout"
        onClick={onLayout}
        style={btnStyle(60)}
      >
        <FaProjectDiagram size={14} />
      </button>
      <Tooltip id="main-tooltip" place="right" />
    </>
  );
}

// Reusable style function for positioning toolbar buttons
function btnStyle(top) {
  return {
    position: "absolute",
    top,
    left: 20,
    zIndex: 1000,
    padding: "8px 12px",
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  };
}
