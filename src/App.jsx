import { useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import axios from "axios";
import InputNode from "./nodes/InputNode";
import ResultNode from "./nodes/ResultNode";

const nodeTypes = { inputNode: InputNode, resultNode: ResultNode };

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const handlePromptChange = useCallback((val) => {
    setPrompt(val);
    setNodes((nds) =>
      nds.map((n) =>
        n.id === "1"
          ? {
              ...n,
              data: { ...n.data, prompt: val, onChange: handlePromptChange },
            }
          : n,
      ),
    );
  }, []);

  const [nodes, setNodes, onNodesChange] = useNodesState([
    {
      id: "1",
      type: "inputNode",
      position: { x: 80, y: 180 },
      data: { prompt: "", onChange: handlePromptChange },
    },
    {
      id: "2",
      type: "resultNode",
      position: { x: 560, y: 180 },
      data: { result: "" },
    },
  ]);

  const [edges, setEdges, onEdgesChange] = useEdgesState([
    {
      id: "e1-2",
      source: "1",
      target: "2",
      animated: true,
      style: { stroke: "#a78bfa", strokeWidth: 2 },
    },
  ]);

  const updateResultNode = (newResult) => {
    setResult(newResult);
    setNodes((nds) =>
      nds.map((n) =>
        n.id === "2" ? { ...n, data: { result: newResult } } : n,
      ),
    );
  };

  const runFlow = async () => {
    if (!prompt.trim()) return alert("Please type a prompt first!");
    setLoading(true);
    setSaved(false);
    updateResultNode("__loading__");

    try {
      5000;
      const { data } = await axios.post(
        "https://backend-1-s30x.onrender.com/api/ask-ai",
        {
          prompt,
        },
      );
      updateResultNode(data.answer);
    } catch (err) {
      updateResultNode(
        "__error__:" + (err.response?.data?.error || err.message),
      );
    }

    setLoading(false);
  };

  const save = async () => {
    if (!result || result === "__loading__")
      return alert("Run the flow first!");

    try {
      await axios.post("https://backend-1-s30x.onrender.com/api/save", {
        prompt,
        response: result,
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0a0a12",
        fontFamily: "'DM Mono', 'Courier New', monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        .topbar { 
          padding: 14px 28px;
          background: rgba(10,10,18,0.95);
          border-bottom: 1px solid rgba(167,139,250,0.15);
          display: flex;
          gap: 12px;
          align-items: center;
        }

        .logo {
          color: #fff;
          font-family: 'Syne', sans-serif;
          font-weight: 800;
          font-size: 22px;
          margin-right: auto;
        }

        .btn-run {
          background: #7c3aed;
          color: #fff;
          border: none;
          border-radius: 8px;
          padding: 10px 20px;
          cursor: pointer;
        }

        .btn-save {
          background: transparent;
          color: ${saved ? "#34d399" : "#a78bfa"};
          border: 1px solid ${saved ? "#34d399" : "#a78bfa"};
          border-radius: 8px;
          padding: 10px 20px;
          cursor: pointer;
        }
      `}</style>

      <div className="topbar">
        <div className="logo">AI Flow</div>

        <button
          className="btn-run"
          onClick={runFlow}
          disabled={loading || !prompt}
        >
          {loading ? "Running..." : "▶ Run Flow"}
        </button>

        <button className="btn-save" onClick={save}>
          {saved ? "✓ Saved!" : "⬆ Save"}
        </button>
      </div>

      {/* 🔥 FULLY FIXED AREA */}
      <div style={{ flex: 1, width: "100%", height: "100%" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.4 }}
          panOnDrag={false} // ❌ NO DRAGGING
          zoomOnScroll={false} // ❌ NO ZOOM
          zoomOnDoubleClick={false}
          zoomOnPinch={false}
          nodesDraggable={false} // ❌ nodes also fixed
        >
          <Background color="rgba(167,139,250,0.06)" gap={28} size={1} />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
