"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@src/components/ui/button";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

export enum QuestionTypeEnum {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  TEXTAREA = "textarea",
  SELECT = "select",
  MULTI_SELECT = "multiSelect",
}

export type Question = {
  id: number;
  label: string;
  type: QuestionTypeEnum;
  maxLength?: number;
  answers?: string[];
  min?: number;
  max?: number;
  x: number;
  y: number;
};

const App = () => {
  const [questions, setQuestions] = useState<Question[]>([]);

  const onAddQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        label: "What is the grandfather's name?",
        type: QuestionTypeEnum.TEXT,
        x: 400,
        y: questions.length * 100,
      },
    ]);
  };

  console.log("questions :>> ", questions);

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
        <Canvas questions={questions} />
      </section>
      <section className="bg-blue-700 col-span-3"></section>
    </main>
  );
};

export default App;
