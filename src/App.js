import React, { useRef, useState } from "react";
import Canvas from "./Canvas";
import { FaPaintBrush, FaTrash, FaSquare, FaCircle, FaSlash ,FaCog } from "react-icons/fa";
import { FaDrawPolygon } from "react-icons/fa"; // rectangle icon
import "./App.css";

function App() {
  const canvasRef = useRef();

  const [tool, setTool] = useState("brush");
  const [brushColor, setBrushColor] = useState("#9c27b0"); // default purple
  
  const [showSettings, setShowSettings] = useState(false);

  const presetColors = ["#9c27b0", "#e53935", "#1e88e5", "#43a047"]; // purple, red, blue, green

  return (
    
    <div className="app-container">
      
      <header class="app-header">  <h2> Inkspire - Creativity Unleashed !!! </h2> </header>
      <div className="app-body">
      <aside className="sidebar">
        <button className="tool" onClick={() => setTool("brush")} data-tooltip="Brush">
          <FaPaintBrush size={20} />
        </button>
        <button className="tool" onClick={() => setTool("square")} data-tooltip="Square">
          <FaSquare size={20} />
        </button>
        <button className="tool" onClick={() => setTool("rectangle")} data-tooltip="Rectangle">
          <FaDrawPolygon size={20} />
        </button>
        <button className="tool" onClick={() => setTool("circle")} data-tooltip="Circle">
          <FaCircle size={20} />
        </button>
        <button className="tool" onClick={() => setTool("line")} data-tooltip="Line">
          <FaSlash size={20} />
        </button>
        <button className="tool" onClick={() => canvasRef.current.clearCanvas()} data-tooltip="Clear">
          <FaTrash size={20} />
        </button>
        <button className="tool" onClick={() => setShowSettings(!showSettings)} data-tooltip="Settings">
          <FaCog size={20} />
        </button>

      </aside>
     
       <main className="canvas-container">
        <Canvas ref={canvasRef} tool={tool} brushColor={brushColor} />
        {showSettings && (
          <div className="settings-panel">
            <p>Brush Color:</p>
            <div className="color-options">
              {presetColors.map((color) => (
                <button
                  key={color}
                  className="color-swatch"
                  style={{ backgroundColor: color }}
                  onClick={() => setBrushColor(color)}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
     </div>
  );
}

export default App;
