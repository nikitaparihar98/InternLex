import React, { useRef, useEffect, useState } from 'react';
import { 
  Bold, 
  Italic, 
  Underline, 
  Link as LinkIcon, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  AlignJustify,
  Eraser
} from 'lucide-react';

function ToolbarButton({ onClick, title, active, children }) {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "32px",
        height: "32px",
        cursor: "pointer",
        border: "none",
        borderRadius: "4px",
        background: active 
          ? "#EDE7DC" 
          : isHovered 
            ? "#F5F1EA" 
            : "transparent",
        color: active ? "#B8871B" : "#111111",
        transition: "all 0.2s ease-in-out",
        outline: "none",
      }}
      title={title}
    >
      {children}
    </button>
  );
}

export default function RichTextEditor({ value, onChange, style }) {
  const editorRef = useRef(null);
  const isFirstRender = useRef(true);
  
  const [fontFamily, setFontFamily] = useState('');
  const [fontSize, setFontSize] = useState('');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [alignment, setAlignment] = useState('left');
  const [isBulletList, setIsBulletList] = useState(false);
  const [isOrderedList, setIsOrderedList] = useState(false);

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

          // Update styles toggle states
          setIsBold(document.queryCommandState('bold'));
          setIsItalic(document.queryCommandState('italic'));
          setIsUnderline(document.queryCommandState('underline'));
          setIsBulletList(document.queryCommandState('insertUnorderedList'));
          setIsOrderedList(document.queryCommandState('insertOrderedList'));
          
          if (document.queryCommandState('justifyCenter')) {
            setAlignment('center');
          } else if (document.queryCommandState('justifyRight')) {
            setAlignment('right');
          } else if (document.queryCommandState('justifyFull')) {
            setAlignment('justify');
          } else {
            setAlignment('left');
          }
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
      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", padding: "8px 12px", borderBottom: "1px solid #DDD5C5", backgroundColor: "#FDFBF7", alignItems: "center" }}>
        
        {/* Basic formatting group */}
        <ToolbarButton
          onClick={() => executeCommand('bold')}
          title="Bold"
          active={isBold}
        >
          <Bold size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('italic')}
          title="Italic"
          active={isItalic}
        >
          <Italic size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('underline')}
          title="Underline"
          active={isUnderline}
        >
          <Underline size={16} />
        </ToolbarButton>

        <div style={{ width: "1px", height: "20px", backgroundColor: "#DDD5C5", margin: "0 2px" }} />

        {/* Alignment group */}
        <ToolbarButton
          onClick={() => executeCommand('justifyLeft')}
          title="Align Left"
          active={alignment === 'left'}
        >
          <AlignLeft size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('justifyCenter')}
          title="Align Center"
          active={alignment === 'center'}
        >
          <AlignCenter size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('justifyRight')}
          title="Align Right"
          active={alignment === 'right'}
        >
          <AlignRight size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('justifyFull')}
          title="Justify"
          active={alignment === 'justify'}
        >
          <AlignJustify size={16} />
        </ToolbarButton>

        <div style={{ width: "1px", height: "20px", backgroundColor: "#DDD5C5", margin: "0 2px" }} />
        
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
            height: "32px",
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
            height: "32px"
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

        <div style={{ width: "1px", height: "20px", backgroundColor: "#DDD5C5", margin: "0 2px" }} />

        {/* Lists group */}
        <ToolbarButton
          onClick={() => executeCommand('insertUnorderedList')}
          title="Bullet List"
          active={isBulletList}
        >
          <List size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('insertOrderedList')}
          title="Numbered List"
          active={isOrderedList}
        >
          <ListOrdered size={16} />
        </ToolbarButton>

        <div style={{ width: "1px", height: "20px", backgroundColor: "#DDD5C5", margin: "0 2px" }} />

        {/* Links and formatting controls */}
        <ToolbarButton
          onClick={() => {
            const url = prompt("Enter Link URL (e.g. https://example.com):");
            if (url) executeCommand('createLink', url);
          }}
          title="Link"
        >
          <LinkIcon size={16} />
        </ToolbarButton>
        <ToolbarButton
          onClick={() => executeCommand('removeFormat')}
          title="Clear Formatting"
        >
          <Eraser size={16} />
        </ToolbarButton>
      </div>

      {/* Editor Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="rich-text-content"
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

