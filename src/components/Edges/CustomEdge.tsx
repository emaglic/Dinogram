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

const CustomEdge = ({ pathMethod, ...props }: Props) => {
  const theme = useTheme();

  console.log("props: ", props);

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
      <path
        id={id}
        d={edgePath}
        fill="none"
        stroke={
          selected ? theme.palette.primary.main : theme.palette.text.primary
        }
        strokeWidth={4} // Change the thickness here
        style={{
          ...style,
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

export const StraightEdge = (props: EdgeProps) => {
  return <CustomEdge pathMethod={getStraightPath} {...props} />;
};

export const BezierEdge = (props: EdgeProps) => {
  <CustomEdge pathMethod={getBezierPath} {...props} />;
};

export const SimpleBezierEdge = (props: EdgeProps) => {
  <CustomEdge pathMethod={getSimpleBezierPath} {...props} />;
};

export const SmoothStepEdge = (props: EdgeProps) => {
  <CustomEdge pathMethod={getSmoothStepPath} {...props} />;
};
