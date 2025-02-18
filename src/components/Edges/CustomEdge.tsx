import {
  EdgeLabelRenderer,
  EdgeProps,
  getBezierPath,
  getSimpleBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
} from "@xyflow/react";
import { useTheme } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// ["Straight", "Bezier", "Simple Bezier", "Smooth Step"],

interface Props extends EdgeProps {
  pathMethod:
    | typeof getBezierPath
    | typeof getSimpleBezierPath
    | typeof getSmoothStepPath
    | typeof getStraightPath;
}

const getPathMethod = (type) => {
  const path = {
    bezier: getBezierPath,
    simpleBezier: getSimpleBezierPath,
    smoothStep: getSmoothStepPath,
    straight: getStraightPath,
  };
  return path[type];
};

const CustomEdge = (props) => {
  const theme = useTheme();

  const pathMethod = getPathMethod(props.data.pathType);

  const {
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
    style = {},
    markerEnd,
    data,
    selected,
  } = props;

  const [edgePath] = pathMethod({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      {selected ? (
        <path
          d={edgePath}
          fill="none"
          stroke={theme.palette.primary.main}
          strokeWidth={data.stroke.width + 8} // Slightly thicker than the main stroke
          style={{ position: "absolute" }}
        />
      ) : null}

      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={data.stroke.color}
        strokeWidth={data.stroke.width} // Change the thickness here
        style={{
          ...style,
          opacity: data.stroke.opacity / 100,
          display: props.data.visible ? "block" : "none",
        }}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <></>
      </EdgeLabelRenderer>
    </>
  );
};

export default CustomEdge;
