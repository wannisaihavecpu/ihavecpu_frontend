import React, { useState } from "react";

const ButtonText = ({ children, onClick }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 2000); //  2-second delay
    setTimeout(() => {
      onClick();
    }, 2000);
  };

  const loaderStyle = {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #d4001a",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    animation: `${isLoading ? "spin 1s linear infinite" : "none"}`,
    margin: "auto",

    marginTop: "-3px",
    display: "block",
  };

  const keyframes = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;

  return (
    <div>
      <style>{keyframes}</style>
      <button
        type="button"
        className={`btn btn-primary btn-lg ${isLoading ? "disabled" : ""}`}
        id="load1"
        onClick={handleSubmit}
        disabled={isLoading}
        style={{
          background: "none",
          border: "none",
          padding: "0",
          font: "inherit",
          color: "inherit",
          textDecoration: "none",
          cursor: "pointer",
          textAlign: "right",
          transition: "color 0.3s ease-in-out",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "#dd001a";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "inherit";
        }}
      >
        {isLoading ? <div style={loaderStyle}></div> : children}
      </button>
    </div>
  );
};

export default ButtonText;
