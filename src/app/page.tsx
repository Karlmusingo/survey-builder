"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@src/components/ui/button";
import CustomizeQuestionForm from "./CustomizeQuestionForm";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export type QuestionType =
  | "number"
  | "text"
  | "email"
  | "textarea"
  | "select"
  | "multiSelect"
  | undefined;

export type Question = {
  id: number;
  label: string;
  type?: QuestionType;
  maxLength?: number;
  minLength?: number;
  answers?: { answer: string }[];
  min?: number;
  max?: number;
  x: number;
  y: number;
};

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestion, setSelectedQuestion] = useState<Question>();

  const onAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        label: "",
        type: "text",
        x: 400,
        y: questions.length * 100,
      },
    ]);
  };

  const onSaveQuestion = (values: any) => {
    setSelectedQuestion(undefined);
    setQuestions(
      questions.map((item) => {
        if (item.id === selectedQuestion?.id) {
          return {
            ...item,
            ...values,
          };
        }
        return item;
      })
    );
  };

  console.log("selectedQuestion :>> ", selectedQuestion);

  return (
    <main className="grid grid-cols-10 gap-2 p-2">
      <section className="col-span-7 relative">
        <Button
          variant="default"
          size="icon"
          className="shadow-2xl cursor-pointer z-50 absolute right-2 top-2"
          onClick={() => onAddQuestion()}
        >
          <Plus strokeWidth={2} size={48} />
        </Button>
        <Canvas
          questions={questions}
          onClick={(id) => {
            setSelectedQuestion(questions.find((item) => item.id === id));
          }}
        />
      </section>
      <section className="border-blue-400 border-l-[1px] col-span-3 p-4">
        <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-4">
          Edit question
        </h3>
        {selectedQuestion && (
          <CustomizeQuestionForm
            question={selectedQuestion}
            onSaveQuestion={onSaveQuestion}
          />
        )}
      </section>
    </main>
  );
};

export default App;
