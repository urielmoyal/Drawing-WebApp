import { React, useState } from "react";
import LeftImages from "./LeftImages";
import Statistics from "./Statistics";
import PaintCanvas from "./PaintCanvas";
import ToolBar from "./ToolBar";

function App() {
  const [canvas, setCanvas] = useState();
  const [canvasProps, setCanvasProps] = useState({
    //defualt valuse
    brushSize: "1",
    brushColor: "#000000",
    bgColor: "#FFFFFF",
    pos: { X: 0, Y: 0 },
  });

  return (
    <div id="wrapper">
      <h1>Paint 2.0</h1>
      <div>
        <ToolBar canvas={canvas} setCanvasProps={setCanvasProps} />
        <PaintCanvas
          setCanvas={setCanvas}
          canvasProps={canvasProps}
          setCanvasProps={setCanvasProps}
        />
        <Statistics canvasProps={canvasProps} />
        <LeftImages canvas={canvas} />
      </div>
    </div>
  );
}

export default App;
