import React, { useRef, useEffect, useState } from "react";

function PaintCanvas(props) {
  const [isPainting, setIsPainting] = useState(false);
  const canvasRef = useRef();

  function draw(event) {
    props.setCanvasProps((preVal) => {
      return {
        ...preVal,
        pos: {
          X: event.clientX - canvasRef.current.offsetLeft,
          Y: event.clientY - canvasRef.current.offsetTop,
        },
      };
    });
    if (isPainting) {
      let ctx = canvasRef.current.getContext("2d");
      ctx.lineWidth = props.canvasProps.brushSize;
      ctx.lineCap = "round";
      ctx.lineTo(props.canvasProps.pos.X, props.canvasProps.pos.Y);
      ctx.strokeStyle = props.canvasProps.brushColor;
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(props.canvasProps.pos.X, props.canvasProps.pos.Y);
    }
  }
  function down(e) {
    setIsPainting(true);
  }
  function up() {
    setIsPainting(false);
    canvasRef.current.getContext("2d").beginPath();
  }

  useEffect(() => {
    props.setCanvas(canvasRef.current);
  }, [props]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        id="paintCanvas"
        width="600"
        height="400"
        onMouseUp={up}
        onMouseDown={down}
        onMouseMove={draw}
        onMouseLeave={up}
      ></canvas>
    </div>
  );
}

export default PaintCanvas;
