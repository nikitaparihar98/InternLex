import React, { useRef, useEffect, useState } from 'react';

export default function RichTextEditor({ value, onChange, style }) {
  const editorRef = useRef(null);
  const isFirstRender = useRef(true);
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');

  useEffect(() => {
    const handleSelectionChange = () => {
      if (editorRef.current && document.activeElement === editorRef.current) {
        try {
          const font = document.queryCommandValue('fontName') || '';
          const cleanedFont = font.replace(/['"]/g, '').toLowerCase();
          
          // Match with our available fonts
          const availableFonts = ["arial", "courier new", "georgia", "impact", "times new roman", "trebuchet ms", "verdana"];
          const matchedFont = availableFonts.find(f => cleanedFont.includes(f)) || "";
          
          let fontValue = "";
          if (matchedFont === "arial") fontValue = "Arial";
          else if (matchedFont === "courier new") fontValue = "Courier New";
          else if (matchedFont === "georgia") fontValue = "Georgia";
          else if (matchedFont === "impact") fontValue = "Impact";
          else if (matchedFont === "times new roman") fontValue = "Times New Roman";
          else if (matchedFont === "trebuchet ms") fontValue = "Trebuchet MS";
          else if (matchedFont === "verdana") fontValue = "Verdana";
          
          const size = document.queryCommandValue('fontSize') || '';
          const sizeValue = ["1", "2", "3", "4", "5", "6", "7"].includes(size.toString()) ? size.toString() : "";

          setFontFamily(fontValue);
          setFontSize(sizeValue);
        } catch (e) {
          // ignore query command errors if not supported or disabled
        }
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
    };
  }, []);

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
        
        {/* Font Family Dropdown */}
        <select
          value={fontFamily}
          onChange={(e) => {
            const val = e.target.value;
            executeCommand('fontName', val);
            setFontFamily(val);
          }}
          style={{
            padding: "2px 6px",
            cursor: "pointer",
            border: "1px solid #DDD5C5",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            fontSize: "13px",
            color: "#111111",
            outline: "none",
            height: "28px",
            fontFamily: fontFamily || "inherit"
          }}
          title="Font Family"
        >
          <option value="">Font</option>
          <option value="Arial" style={{ fontFamily: "Arial" }}>Arial</option>
          <option value="Courier New" style={{ fontFamily: "Courier New" }}>Courier New</option>
          <option value="Georgia" style={{ fontFamily: "Georgia" }}>Georgia</option>
          <option value="Impact" style={{ fontFamily: "Impact" }}>Impact</option>
          <option value="Times New Roman" style={{ fontFamily: "Times New Roman" }}>Times New Roman</option>
          <option value="Trebuchet MS" style={{ fontFamily: "Trebuchet MS" }}>Trebuchet MS</option>
          <option value="Verdana" style={{ fontFamily: "Verdana" }}>Verdana</option>
        </select>

        {/* Font Size Dropdown */}
        <select
          value={fontSize}
          onChange={(e) => {
            const val = e.target.value;
            executeCommand('fontSize', val);
            setFontSize(val);
          }}
          style={{
            padding: "2px 6px",
            cursor: "pointer",
            border: "1px solid #DDD5C5",
            borderRadius: "4px",
            backgroundColor: "#FFFFFF",
            fontSize: "13px",
            color: "#111111",
            outline: "none",
            height: "28px"
          }}
          title="Font Size"
        >
          <option value="">Size</option>
          <option value="1">XS (10px)</option>
          <option value="2">S (13px)</option>
          <option value="3">M (16px)</option>
          <option value="4">L (18px)</option>
          <option value="5">XL (24px)</option>
          <option value="6">XXL (32px)</option>
          <option value="7">XXXL (48px)</option>
        </select>

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
