import React, { useEffect, useRef } from "react";

const ModalCheckBox = ({ children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <div
      ref={modalRef}
      style={{
        position: "absolute",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        maxWidth: "300px", // Adjust the maximum width as needed
        overflowY: "auto", // Add vertical scrollbar if content overflows
        maxHeight: "70vh", // Set a maximum height to control the scrollbar
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        {/* Your additional header content can go here */}
        {/* No close button */}
      </div>
      {children}
    </div>
  );
};

export default ModalCheckBox;
