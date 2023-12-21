import React, { useEffect, useRef } from "react";
import styles from "@component/products/scroll.module.css";

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
      className={styles.scroll}
      ref={modalRef}
      style={{
        position: "absolute",
        backgroundColor: "white",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        maxWidth: "300px",
        overflowY: "auto",
        maxHeight: "30vh",
      }}
    >
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
    
      </div> */}
      {children}
    </div>
  );
};

export default ModalCheckBox;
