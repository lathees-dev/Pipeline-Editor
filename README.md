# 🧠 Nexstem Frontend Assignment – DAG Pipeline Editor

This project is a React-based **Pipeline Editor (DAG Builder)** designed for Nexstem's internship assignment. It enables users to create, connect, and validate nodes in a directed acyclic graph with real-time feedback.

---

## 🚀 Live Demo

👉 [Click here to view the live demo](https://pipeline-editor-olive.vercel.app/)

---

## ⚙️ Features

- ✅ Add custom-labeled nodes via modal
- 🔗 Draw directional edges (with arrowheads)
- ❌ Prevent and highlight invalid connections (e.g., self-loops)
- ⚠️ Real-time DAG validation (cycle, connection, rules)
- 📊 JSON preview of graph state
- 🧭 Auto layout (top-down) with `dagre`
- 🧠 Full validation status bar
- 🛠️ UI enhancements:
  - Icon buttons with tooltips
  - Visual red highlight for invalid links
  - Modal-based node creation (non-blocking)
  - Responsive layout with controls and overlays

---

## ✅ DAG Validation Rules

- Must have **at least 2 nodes**
- Must have **no cycles**
- All nodes must be **connected to at least one edge**
- Edges must follow **directional rules**
- **Self-loops are disallowed**

---

## 🧰 Tech Stack

- [React](https://reactjs.org/)
- [React Flow](https://reactflow.dev/)
- [Vite](https://vitejs.dev/)
- [Dagre](https://github.com/dagrejs/dagre) for auto-layout
- [NanoID](https://github.com/ai/nanoid) for unique IDs
- [React Icons](https://react-icons.github.io/react-icons/) for toolbar icons
- [React Tooltip](https://react-tooltip.com/) for tooltips

---

## 📂 Folder Structure
```
pipeline-editor/
├── public/
├── src/
│ ├── components/
│ │ ├── Toolbar.jsx
│ │ ├── JsonPreview.jsx
│ │ └── StatusBar.jsx
│ ├── hooks/
│ │ ├── useGraphHandlers.js
│ │ └── useDagValidation.js
│ ├── utils/
│ │ └── layoutEngine.js
│ ├── App.jsx
│ └── main.jsx
├── .gitignore
├── package.json
├── README.md
└── vite.config.js
```
---

## 📦 Setup Instructions
```
git clone https://github.com/your-username/dag-pipeline-editor.git
cd dag-pipeline-editor
npm install
npm run dev 
```

🎥 Screenshots
Node Builder
![image](https://github.com/user-attachments/assets/ca9b38fb-5318-433d-91e4-2b2a14fda286)

Add a Node
![image](https://github.com/user-attachments/assets/fae133bd-e553-4866-a047-bbc7d340e22b)

Unconnected Nodes
![image](https://github.com/user-attachments/assets/2857b19b-003d-44cc-8dd2-8dac171aa8a0)

Connected nodes
![image](https://github.com/user-attachments/assets/901a6da0-4fd3-4ae6-b85d-115ab73f4879)

Auto Layout
![image](https://github.com/user-attachments/assets/29625c1e-40ed-4293-b0a6-d3033b75923a)


Built with 💡, React Flow, and caffeine.
