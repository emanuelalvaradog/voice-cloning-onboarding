import { useEffect, useRef, useState } from "react";
import "./styles/Recorder.css";

export function VoiceRecorder({ index, setBlobArray, next, text }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.addEventListener("dataavailable", (e) => {
          setAudioChunks((prev) => [...prev, e.data]);
        });

        mediaRecorder.addEventListener("stop", () => {
          setIsRecording(false);
        });

        mediaRecorder.start();
        setIsRecording(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const repeatRecording = () => {
    setAudioUrl(null);
    setAudioChunks([]);
    setIsRecording(false);
    mediaRecorderRef.current = null;
    startRecording();
  };

  useEffect(() => {
    if (audioChunks.length > 0) {
      const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      setBlobArray((prev) => [...prev, url]);
    }
  }, [audioChunks]);

  useEffect(() => {
    setAudioUrl(null);
    setAudioChunks([]);
    setIsRecording(false);
    mediaRecorderRef.current = null;
  }, [index]);

  return (
    <div className="recorder">
      <h1>Audio recorder</h1>
      <h2>{text}</h2>
      {audioUrl && (
        <div>
          <audio controls src={audioUrl} />{" "}
        </div>
      )}
      {audioUrl && !isRecording ? (
        <>
          <button onClick={next}>Siguiente</button>
          <button onClick={repeatRecording}>Repetir grabación</button>
        </>
      ) : isRecording ? (
        <button onClick={stopRecording} disabled={!isRecording}>
          Stop recording
        </button>
      ) : (
        <button onClick={startRecording} disabled={isRecording}>
          Record Audio
        </button>
      )}
    </div>
  );
}
