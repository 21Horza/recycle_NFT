import React from "react";
import { useNavigate } from "react-router-dom";
import "./myModal.css";

function Modal({ value, text, title, pic, gonext }) {
  const navigate = useNavigate()

  return (
    <div className="modal">
      <div className="modal__container">
        <div className="title">
          <h1>{title}</h1>
          <img height={150} width={150} src={pic} />
        </div>
        <div className="body">
          <p>{text}</p>
        </div>
        <div className="footer">
          <button onClick={() => gonext()}>{value}</button>
        </div>
      </div>
    </div>
  );
}

export default Modal;