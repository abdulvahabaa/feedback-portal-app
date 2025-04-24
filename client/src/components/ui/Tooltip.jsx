import { useState, useEffect } from "react";

const HoverTooltip = ({ text, children }) => {
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setTooltipPos({
        x: e.clientX + 15, // Offset tooltip slightly
        y: e.clientY + 15,
      });
    };

    if (visible) {
      window.addEventListener("mousemove", updatePosition);
    } else {
      window.removeEventListener("mousemove", updatePosition);
    }

    return () => window.removeEventListener("mousemove", updatePosition);
  }, [visible]);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}

      {visible && (
        <div
          className="fixed bg-gray-800 text-white text-xs px-2 py-1 rounded-full shadow-lg z-50"
          style={{
            top: `${tooltipPos.y}px`,
            left: `${tooltipPos.x}px`,
            whiteSpace: "nowrap",
            pointerEvents: "none", // Prevents tooltip from interfering with mouse events
          }}
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default HoverTooltip;
