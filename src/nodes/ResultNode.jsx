import { Handle, Position } from "@xyflow/react";

export default function ResultNode({ data }) {
  const isLoading = data.result === "__loading__";
  const isError =
    typeof data.result === "string" && data.result.startsWith("__error__:");
  const isEmpty = !data.result;
  const errorMsg = isError ? data.result.replace("__error__:", "") : "";
  const displayText = isError ? errorMsg : data.result;

  return (
    <div
      style={{
        width: 380,
        background: "rgba(15,15,28,0.95)",
        border: `1px solid ${isError ? "rgba(239,68,68,0.3)" : isLoading ? "rgba(167,139,250,0.4)" : isEmpty ? "rgba(167,139,250,0.15)" : "rgba(52,211,153,0.3)"}`,
        borderRadius: 16,
        padding: 0,
        boxShadow: isError
          ? "0 0 40px rgba(239,68,68,0.1), 0 20px 60px rgba(0,0,0,0.5)"
          : "0 0 40px rgba(52,211,153,0.08), 0 20px 60px rgba(0,0,0,0.5)",
        overflow: "hidden",
        fontFamily: "'DM Mono', 'Courier New', monospace",
        transition: "border-color 0.4s, box-shadow 0.4s",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700&display=swap');

        .result-header {
          padding: 14px 18px;
          background: linear-gradient(135deg, rgba(52,211,153,0.1), rgba(96,165,250,0.05));
          border-bottom: 1px solid rgba(52,211,153,0.1);
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .result-header.error-header {
          background: linear-gradient(135deg, rgba(239,68,68,0.1), rgba(239,68,68,0.05));
          border-bottom: 1px solid rgba(239,68,68,0.15);
        }
        .result-header.loading-header {
          background: linear-gradient(135deg, rgba(167,139,250,0.15), rgba(96,165,250,0.05));
          border-bottom: 1px solid rgba(167,139,250,0.2);
        }
        .result-icon {
          width: 28px; height: 28px;
          background: linear-gradient(135deg, #059669, #10b981);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 13px;
          box-shadow: 0 0 12px rgba(16,185,129,0.4);
        }
        .result-icon.error { background: linear-gradient(135deg, #dc2626, #ef4444); box-shadow: 0 0 12px rgba(239,68,68,0.4); }
        .result-icon.loading { background: linear-gradient(135deg, #7c3aed, #6d28d9); box-shadow: 0 0 12px rgba(124,58,237,0.4); }
        .result-title {
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          color: #e2e8f0;
        }
        .result-badge {
          margin-left: auto;
          font-size: 10px;
          color: rgba(52,211,153,0.6);
          border: 1px solid rgba(52,211,153,0.2);
          border-radius: 20px;
          padding: 2px 8px;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .result-body { padding: 16px; min-height: 140px; }
        .result-label {
          font-size: 10px;
          color: rgba(52,211,153,0.4);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          margin-bottom: 10px;
        }
        .result-label.error { color: rgba(239,68,68,0.5); }
        .result-label.loading { color: rgba(167,139,250,0.5); }
        
        .result-text {
          font-size: 13px;
          line-height: 1.7;
          color: #cbd5e1;
          white-space: pre-wrap;
          word-break: break-word;
          max-height: 280px;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(167,139,250,0.2) transparent;
        }
        .result-text::-webkit-scrollbar { width: 4px; }
        .result-text::-webkit-scrollbar-thumb { background: rgba(167,139,250,0.2); border-radius: 4px; }

        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100px;
          gap: 8px;
          color: rgba(255,255,255,0.1);
          font-size: 12px;
          letter-spacing: 1px;
        }
        .empty-state .empty-icon { font-size: 28px; opacity: 0.3; }

        .loading-bars {
          display: flex;
          gap: 5px;
          align-items: flex-end;
          height: 30px;
          margin-bottom: 12px;
        }
        .loading-bar {
          width: 4px;
          background: linear-gradient(to top, #7c3aed, #a78bfa);
          border-radius: 4px;
          animation: barPulse 1s ease-in-out infinite;
        }
        .loading-bar:nth-child(2) { animation-delay: 0.15s; }
        .loading-bar:nth-child(3) { animation-delay: 0.3s; }
        .loading-bar:nth-child(4) { animation-delay: 0.45s; }
        .loading-bar:nth-child(5) { animation-delay: 0.6s; }
        @keyframes barPulse {
          0%, 100% { height: 6px; opacity: 0.4; }
          50% { height: 28px; opacity: 1; }
        }
        .loading-text { color: rgba(167,139,250,0.6); font-size: 12px; letter-spacing: 1px; }

        .error-text { color: #fca5a5; font-size: 12px; line-height: 1.6; }

        /* Markdown-like bold */
        .result-text strong { color: #e2e8f0; font-weight: 500; }
      `}</style>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: isError ? "#ef4444" : "#10b981",
          border: `2px solid ${isError ? "rgba(239,68,68,0.5)" : "rgba(52,211,153,0.5)"}`,
          width: 12,
          height: 12,
          boxShadow: `0 0 10px ${isError ? "rgba(239,68,68,0.8)" : "rgba(16,185,129,0.8)"}`,
          transition: "all 0.3s",
        }}
      />

      <div
        className={`result-header ${isError ? "error-header" : isLoading ? "loading-header" : ""}`}
      >
        <div
          className={`result-icon ${isError ? "error" : isLoading ? "loading" : ""}`}
        >
          {isError ? "✕" : isLoading ? "⟳" : "✦"}
        </div>
        <div className="result-title">AI Response</div>
        <div className="result-badge">Node 02</div>
      </div>

      <div className="result-body">
        {isEmpty && (
          <div className="empty-state">
            <div className="empty-icon">◎</div>
            <div>Awaiting prompt...</div>
          </div>
        )}

        {isLoading && (
          <>
            <div className={`result-label loading`}>Processing</div>
            <div className="loading-bars">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="loading-bar" />
              ))}
            </div>
            <div className="loading-text">Thinking...</div>
          </>
        )}

        {isError && (
          <>
            <div className="result-label error">Error Occurred</div>
            <div className="error-text">{errorMsg}</div>
          </>
        )}

        {!isEmpty && !isLoading && !isError && (
          <>
            <div className="result-label">Response</div>
            <div className="result-text">{displayText}</div>
          </>
        )}
      </div>
    </div>
  );
}
