import {
  StraightEdge,
  BezierEdge,
  SimpleBezierEdge,
  SmoothStepEdge,
} from "./CustomEdge";

export const edgeTypes = {
  straight: StraightEdge,
  bezier: BezierEdge,
  simpleBezier: SimpleBezierEdge,
  smoothStep: SmoothStepEdge,
};
