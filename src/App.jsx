import { useState } from "react";
import "./App.css";
import { useRef } from "react";

function App() {
  const uploadedFiles = useRef(null);
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => {
    e.preventDefault();
    let refFiles = Array.from(uploadedFiles.current.files);
    setFiles(refFiles);
  };

  const sendFile = async (file) => {
    let formData = new FormData();
    formData.append("file", file, file.name);
    let res = await fetch("http://127.0.0.1:8000/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .catch((err) => err);

    console.log(res);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    for (let file of files) {
      sendFile(file);
    }
  };

  return (
    <div className="App">
      <h1>Upload audio files</h1>
      <div className="card">
        <input
          type="file"
          accept="audio/*"
          multiple={true}
          onChange={handleFiles}
          ref={uploadedFiles}
        />
        <button onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;
