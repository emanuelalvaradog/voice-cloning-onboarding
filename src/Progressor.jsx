import { useState } from "react";
import "./styles/Progressor.css";

export function Progressor({ text, index, total, next }) {
  return (
    <section className="progressor">
      <div className="progressor-content">
        <h2>{text}</h2>
        <p>
          {index + 1} / {total}
        </p>
      </div>
      <button onClick={next}>Siguiente</button>
    </section>
  );
}
