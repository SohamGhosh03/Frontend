import { Handle, Position } from "@xyflow/react";

export default function InputNode({ data }) {
  return (
    <div
      style={{
        width: 320,
        background: "rgba(15,15,28,0.95)",
        border: "1px solid rgba(167,139,250,0.25)",
        borderRadius: 16,
        padding: 0,
        boxShadow:
          "0 0 40px rgba(124,58,237,0.15), 0 20px 60px rgba(0,0,0,0.5)",
        overflow: "hidden",
        fontFamily: "'DM Mono', 'Courier New', monospace",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700&display=swap');
        
        .input-header {
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(124,58,237,0.2), rgba(96,165,250,0.1));
          border-bottom: 1px solid rgba(167,139,250,0.15);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .node-icon {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #7c3aed, #6d28d9);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          box-shadow: 0 0 12px rgba(124,58,237,0.5);
        }
        .node-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #e2e8f0;
          letter-spacing: 0.3px;
        }
        .node-badge {
          margin-left: auto;
          font-size: 10px;
          color: rgba(167,139,250,0.6);
          border: 1px solid rgba(167,139,250,0.2);
          border-radius: 20px;
          padding: 2px 8px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .input-body { padding: 16px; }
        .input-label {
          font-size: 10px;
          color: rgba(167,139,250,0.5);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 8px;
        }
        .prompt-textarea {
          width: 100%;
          min-height: 110px;
          background: rgba(10,10,20,0.8);
          border: 1px solid rgba(167,139,250,0.15);
          border-radius: 10px;
          color: #e2e8f0;
          font-family: 'DM Mono', monospace;
          font-size: 13px;
          line-height: 1.6;
          padding: 12px 14px;
          resize: vertical;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .prompt-textarea::placeholder { color: rgba(167,139,250,0.25); }
        .prompt-textarea:focus {
          border-color: rgba(167,139,250,0.5);
          box-shadow: 0 0 20px rgba(124,58,237,0.15);
        }
        .char-count {
          font-size: 10px;
          color: rgba(255,255,255,0.2);
          text-align: right;
          margin-top: 6px;
        }
      `}</style>

      <div className="input-header">
        <div className="node-icon">✦</div>
        <div className="node-title">Prompt Input</div>
        <div className="node-badge">Node 01</div>
      </div>

      <div className="input-body">
        <div className="input-label">Your Query</div>
        <textarea
          className="prompt-textarea"
          value={data.prompt}
          onChange={(e) => data.onChange(e.target.value)}
          placeholder="Ask anything... what's the capital of France?"
          rows={5}
        />
        <div className="char-count">{(data.prompt || "").length} chars</div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#7c3aed",
          border: "2px solid rgba(167,139,250,0.5)",
          width: 12,
          height: 12,
          boxShadow: "0 0 10px rgba(124,58,237,0.8)",
        }}
      />
    </div>
  );
}
