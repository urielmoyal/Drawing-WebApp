import React from "react";

function ToolBar(props) {
  function clear() {
    let ctx = props.canvas.getContext("2d");
    ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
  }

  function uploadImage(event) {
    var file = event.target.files;
    if (file.length > 0) {
      const base64Image = URL.createObjectURL(event.target.files[0]);
      const image = new Image();
      image.src = base64Image;
      image.onload = () => {
        props.canvas
          .getContext("2d")
          .drawImage(image, 0, 0, props.canvas.width, props.canvas.height);
      };
    }
  }

  function handleChange(event) {
    props.setCanvasProps((preVal) => {
      return { ...preVal, [event.target.id]: event.target.value };
    });
    if (event.target.id === "bgColor") {
      var ctx = props.canvas.getContext("2d");
      ctx.fillStyle = event.target.value;
      ctx.fillRect(0, 0, props.canvas.width, props.canvas.height);
    }
  }
  return (
    <div id="toolbar">
      <div>
        <label htmlFor="brushSize">Size </label>
        <input
          id="brushSize"
          type="range"
          min="1"
          max="20"
          defaultValue="1"
          onChange={handleChange}
        />
        <label htmlFor="brushColor">Color </label>
        <input id="brushColor" type="color" defaultValue="#000000" onChange={handleChange} />
        <label htmlFor="bgColor">Background </label>
        <input id="bgColor" type="color" defaultValue="#FFFFFF" onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="fileLoadBtn">Load image </label>
        <input id="fileLoadBtn" type="file" onChange={uploadImage} />
        <button id="clearBtn" onClick={clear}>
          Clear
        </button>
      </div>
    </div>
  );
}

export default ToolBar;
