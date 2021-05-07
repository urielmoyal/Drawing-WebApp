import { React, useEffect, useState } from "react";

function LeftImages(props) {
  const [imgArray, setImgArray] = useState([]);

  useEffect(() => {
    try {
      fetch("http://localhost:5000/")
        .then((response) => response.json())
        .then((data) => {
          if (data.sucsess) {
            setImgArray(data.payload);
          } else alert(data.msg);
        });
    } catch (err) {
      console.log(err.massage);
    }
  }, []);

  function setImageToCnavas(e) {
    let ctx = props.canvas.getContext("2d");
    ctx.clearRect(0, 0, props.canvas.width, props.canvas.height);
    let img = new Image();
    img.src = e.target.src;
    props.canvas.getContext("2d").drawImage(img, 0, 0, props.canvas.width, props.canvas.height);
  }

  function createimgs(data, index) {
    return <img key={index} onClick={setImageToCnavas} alt="" src={data.src}></img>;
  }
  function save() {
    const data1 = { src: props.canvas.toDataURL() };

    fetch("http://localhost:5000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucsess) {
          setImgArray((preVal) => {
            return [...preVal, data1];
          });
        } else alert(data.msg);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  function deleteAll() {
    fetch("http://localhost:5000/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.sucsess) {
          alert("All Images Deleted");
          setImgArray([]);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  return (
    <div id="leftImages">
      <h3>Server</h3>
      <button onClick={save}>Save image</button>
      <button onClick={deleteAll}>Delete All</button>
      <div id="imagesList">{imgArray.map(createimgs)}</div>
    </div>
  );
}

export default LeftImages;
