import React, { useRef, useEffect } from 'react';

export default function RichTextEditor({ value, onChange, style }) {
  const editorRef = useRef(null);
  const isFirstRender = useRef(true);

  // Sync value from parent, but ONLY when not focused or on initial mount to avoid cursor jump
  useEffect(() => {
    if (editorRef.current) {
      if (editorRef.current.innerHTML !== value) {
        if (isFirstRender.current || document.activeElement !== editorRef.current) {
          editorRef.current.innerHTML = value || '';
          isFirstRender.current = false;
        }
      }
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command, val = null) => {
    document.execCommand(command, false, val);
    handleInput(); // sync state
  };

  return (
    <div style={{ border: "1px solid #DDD5C5", borderRadius: "4px", overflow: "hidden", ...style }}>
      {/* Toolbar */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", padding: "6px 12px", borderBottom: "1px solid #DDD5C5", backgroundColor: "#FDFBF7", alignItems: "center" }}>
        <button
          type="button"
          onClick={() => executeCommand('bold')}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", fontWeight: "bold", fontSize: "14px", color: "#111111" }}
          title="Bold"
        >
          B
        </button>
        <button
          type="button"
          onClick={() => executeCommand('italic')}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", fontStyle: "italic", fontSize: "14px", color: "#111111" }}
          title="Italic"
        >
          I
        </button>
        <button
          type="button"
          onClick={() => executeCommand('underline')}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", textDecoration: "underline", fontSize: "14px", color: "#111111" }}
          title="Underline"
        >
          U
        </button>
        <div style={{ width: "1px", height: "16px", backgroundColor: "#DDD5C5", margin: "0 4px" }} />
        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter Link URL (e.g. https://example.com):");
            if (url) executeCommand('createLink', url);
          }}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", fontSize: "14px", color: "#111111" }}
          title="Link"
        >
          🔗 Link
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertUnorderedList')}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", fontSize: "14px", color: "#111111" }}
          title="Bullet List"
        >
          • List
        </button>
        <button
          type="button"
          onClick={() => executeCommand('insertOrderedList')}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", fontSize: "14px", color: "#111111" }}
          title="Numbered List"
        >
          1. List
        </button>
        <button
          type="button"
          onClick={() => executeCommand('removeFormat')}
          style={{ padding: "4px 8px", cursor: "pointer", border: "none", background: "none", fontSize: "14px", color: "#6B7280" }}
          title="Clear Formatting"
        >
          🧹 Clear
        </button>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        style={{
          padding: "12px 16px",
          outline: "none",
          minHeight: "200px",
          maxHeight: "500px",
          backgroundColor: "#FFFFFF",
          fontFamily: "'Inter', sans-serif",
          fontSize: "14px",
          lineHeight: "1.6",
          color: "#111111",
          overflowY: "auto",
          textAlign: "left"
        }}
      />
    </div>
  );
}
