import React from "react";
import "./errorMessage.css";
import img from "./jon.jpg";

const ErrorMessage = () => {
   
  return (
    <>
      <img src={img} alt="error" />
      <span className="boldSpan">Something went wrong :( </span>
    </>
  );
};
export default ErrorMessage;
