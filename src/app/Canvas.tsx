import { Stage, Layer, Circle } from "react-konva";

function Canvas() {
  return (
    <Stage
      width={window.innerWidth - 465}
      height={window.innerHeight}
      fill="red"
    >
      <Layer>
        <Circle x={100} y={100} radius={50} fill="green" />
      </Layer>
    </Stage>
  );
}

export default Canvas;
