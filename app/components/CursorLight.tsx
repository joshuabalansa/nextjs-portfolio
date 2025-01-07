import React, { useEffect, useState } from "react";
import "../globals.css";

const CursorLight = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({ x: event.clientX, y: event.clientY + window.scrollY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      className="cursor-light"
      style={{ top: position.y, left: position.x }}
    />
  );
};

export default CursorLight;
