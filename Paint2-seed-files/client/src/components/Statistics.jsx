import React from "react";

function Statistics(props) {
  return (
    <div id="statistics">
      <span id="mousePos">
        Pos: {props.canvasProps.pos.X},{props.canvasProps.pos.Y}
      </span>
      <span id="brushSizeVal">Brush Size: {props.canvasProps.brushSize}</span>
      <span id="brushColorVal">Brush Color: {props.canvasProps.brushColor}</span>
    </div>
  );
}

export default Statistics;
