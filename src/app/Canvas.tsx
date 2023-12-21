import React, { useState } from "react";
import { Stage, Layer, Rect, Text, Arrow, Group } from "react-konva";
import { Question } from "./page";

const WIDTH = 150;
const HEIGHT = 150;

type Props = {
  questions: Question[];
  onClick: (id: number) => void;
  selectedId?: number;
};

function Canvas({ questions, onClick, selectedId }: Props) {
  const [stagePos, setStagePos] = useState({ x: 0, y: 0 });

  // const startX =
  //   Math.floor((-stagePos.x - window.innerWidth - 465) / WIDTH) * WIDTH;
  // const endX =
  //   Math.floor((-stagePos.x + (window.innerWidth - 465) * 2) / WIDTH) * WIDTH;

  // const startY =
  //   Math.floor((-stagePos.y - window.innerHeight) / HEIGHT) * HEIGHT;
  // const endY =
  //   Math.floor((-stagePos.y + window.innerHeight * 2) / HEIGHT) * HEIGHT;

  // const gridComponents = [];
  // var i = 0;
  // for (var x = startX; x < endX; x += WIDTH) {
  //   for (var y = startY; y < endY; y += HEIGHT) {
  //     if (i === 4) {
  //       i = 0;
  //     }

  //     const indexX = Math.abs(x / WIDTH) % grid.length;
  //     const indexY = Math.abs(y / HEIGHT) % grid[0].length;

  //     gridComponents.push(
  //       <Rect
  //         x={x}
  //         y={y}
  //         width={WIDTH}
  //         height={HEIGHT}
  //         fill="white"
  //         stroke="black"
  //         strokeWidth={1}
  //         opacity={0.1}
  //       />
  //     );
  //   }
  // }

  return (
    <Stage
      width={window.innerWidth - 465}
      height={window.innerHeight}
      draggable
      x={stagePos.x}
      y={stagePos.y}
      onDragEnd={(e) => {
        setStagePos(e.currentTarget.position());
      }}
      // fill="red"
      fill
      background="green"
      // background="green"
    >
      <Layer fill="red">
        <>
          {/* {gridComponents} */}
          {questions.map((question, idx, array) => (
            <React.Fragment key={question.id}>
              <Group>
                <Rect
                  x={question.x}
                  y={question.y}
                  width={200}
                  height={40}
                  stroke="black"
                  strokeWidth={1}
                  cornerRadius={[5, 5, 5, 5]}
                  fill={question.id === selectedId ? "green" : "white"}
                  onClick={() => onClick(question.id)}
                  onMouseOver={() => console.log("On mouse over")}
                />
                <Text
                  x={question.x + 15}
                  y={question.y + 15}
                  text={`${idx + 1} - ${
                    question?.label?.length > 22
                      ? `${question?.label?.slice(0, 22)}...`
                      : question?.label
                  }`}
                  ellipsis
                  fontSize={16}
                  fontFamily="Arial"
                  fill={question.id === selectedId ? "white" : "green"}
                  onClick={() => onClick(question.id)}
                />
                {idx + 1 < array.length && (
                  <Arrow
                    points={[500, question.y + 40, 500, question.y + 97]}
                    pointerWidth={5}
                    pointerLength={5}
                    fill="black"
                    stroke="black"
                    strokeWidth={2}
                  />
                )}
              </Group>
            </React.Fragment>
          ))}
        </>
      </Layer>
    </Stage>
  );
}

export default Canvas;
