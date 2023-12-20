import React from "react";
import { Stage, Layer, Rect, Text, Arrow } from "react-konva";
import { Question } from "./page";

type Props = {
  questions: Question[];
  onClick: (id: number) => void;
  selectedId?: number;
};

function Canvas({ questions, onClick, selectedId }: Props) {
  return (
    <Stage
      width={window.innerWidth - 465}
      height={window.innerHeight}
      fill="red"
    >
      <Layer>
        {questions.map((question, idx, array) => (
          <React.Fragment key={question.id}>
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
          </React.Fragment>
        ))}
      </Layer>
    </Stage>
  );
}

export default Canvas;
