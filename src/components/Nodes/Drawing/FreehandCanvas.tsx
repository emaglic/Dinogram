import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Slider,
  TextField,
} from "@mui/material";
import React, { useRef, useState, useEffect } from "react";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import { useTheme } from "@mui/material/styles";
import Styles from "./FreehandCanvas.style";
import { useSelector } from "react-redux";
import { selectIsDragging } from "@/state/Chart/settingsSlice";

const FreehandCanvas = ({
  imageBase64,
  onChange,
  backgroundColor = "transparent",
  selected,
}) => {
  const theme = useTheme();
  const styles = Styles(theme);
  const isDragging = useSelector(selectIsDragging);
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [thickness, setThickness] = useState(4);
  const [mode, setMode] = useState("draw");

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set up canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Always start with a clean slate

    // ✅ Apply background only if it's NOT "transparent"
    if (backgroundColor !== "transparent") {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    ctxRef.current = ctx;

    // ✅ Load the provided Base64 image if available
    if (imageBase64) {
      const img = new Image();
      img.src = imageBase64;
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };
    }
  }, [imageBase64, backgroundColor]);

  const getMouseCoordinates = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    return {
      x: (event.clientX - rect.left) * scaleX,
      y: (event.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e) => {
    setDrawing(true);
    const { x, y } = getMouseCoordinates(e);

    ctxRef.current.beginPath();
    ctxRef.current.moveTo(x, y);

    ctxRef.current.lineWidth = thickness;
    if (mode === "erase") {
      ctxRef.current.globalCompositeOperation = "destination-out"; // ✅ Properly erase pixels
    } else {
      ctxRef.current.globalCompositeOperation = "source-over";
      ctxRef.current.strokeStyle = color;
    }
  };

  const draw = (e) => {
    if (!drawing) return;
    const { x, y } = getMouseCoordinates(e);

    ctxRef.current.lineTo(x, y);
    ctxRef.current.stroke();
  };

  const stopDrawing = () => {
    setDrawing(false);
    ctxRef.current.closePath();

    // ✅ Return updated Base64 PNG with transparency support
    const canvas = canvasRef.current;
    const updatedBase64 = canvas.toDataURL("image/png");
    onChange(updatedBase64);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    ctxRef.current.clearRect(0, 0, canvas.width, canvas.height);

    // ✅ Apply background if NOT transparent
    if (backgroundColor !== "transparent") {
      ctxRef.current.fillStyle = backgroundColor;
      ctxRef.current.fillRect(0, 0, canvas.width, canvas.height);
    }

    // ✅ Return empty Base64 PNG (transparent if applicable)
    onChange(canvas.toDataURL("image/png"));
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {selected ? (
        <Box sx={styles.controlContainer}>
          <DragHandleIcon />
          <Box sx={styles.controlContainerInner}>
            <OutlinedInput
              fullWidth
              sx={{
                width: "1.5rem",
                height: "1.5rem",
                cursor: "pointer",
                padding: 0,
                "& input": { padding: 0, width: "100%", height: "100%" },
              }}
              type="color"
              size="small"
              value={color}
              onChange={(e) => {
                setColor(e.target.value);
              }}
              disabled={mode === "erase"}
            />
            <Box
              className="nodrag"
              sx={{
                maxWidth: "200px",
                width: "15%",
                margin: "0 1rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Slider
                aria-label="Volume"
                min={1}
                max={50}
                value={thickness}
                onChange={(evt) => setThickness(parseInt(evt.target.value, 10))}
              />
            </Box>

            <Button
              onClick={() => setMode("draw")}
              variant="contained"
              disabled={mode === "draw"}
              size="small"
              startIcon="🖌"
            >
              Draw
            </Button>
            <Button
              onClick={() => setMode("erase")}
              variant="contained"
              disabled={mode === "erase"}
              size="small"
              startIcon="🧼"
            >
              Erase
            </Button>
            <Button
              onClick={clearCanvas}
              variant="contained"
              size="small"
              startIcon="🗑"
            >
              Clear
            </Button>
          </Box>
          <DragHandleIcon />
        </Box>
      ) : null}
      <canvas
        className={isDragging ? undefined : "nodrag"}
        ref={canvasRef}
        style={{
          width: "100%",
          height: "100%",

          cursor: mode === "erase" ? "cell" : "crosshair",
          background:
            backgroundColor === "transparent" ? "none" : backgroundColor, // ✅ Set correct background
        }}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
    </Box>
  );
};

export default FreehandCanvas;
