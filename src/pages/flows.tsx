// import Flow from "./Flow";

"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import CustomizeQuestionForm from "@src/app/CustomizeQuestionForm";
import "@src/app/globals.css";
import Flow from "@src/pages/Flow";

const Canvas = dynamic(() => import("@src/app/Canvas"), {
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
  const [title, setTitle] = useState("");

  const onAddQuestion = () => {
    if (selectedQuestion) {
      const selectedIdx = questions.findIndex(
        (item) => item.id === selectedQuestion.id
      );

      const firstQuestions = questions.slice(0, selectedIdx + 1);
      const secondQuestions = questions.slice(selectedIdx + 1);

      return setQuestions(
        [
          ...firstQuestions,
          {
            id: questions.length,
            label: "",
            type: "text",
            x: 400,
            y: questions.length * 100,
          } as Question,
          ...secondQuestions,
        ].map((item, idx) => {
          return {
            ...item,
            x: 400,
            y: idx * 100,
          };
        })
      );
    }
    setQuestions([
      ...questions,
      {
        id: questions.length,
        label: `${questions.length}`,
        type: "text",
        x: 400,
        y: questions.length * 100,
      },
    ]);
  };

  const onRemoveQuestion = (id: number) => {
    setQuestions(
      questions
        .filter((item) => item.id !== id)
        .map((item, idx) => {
          return {
            ...item,
            x: 400,
            y: idx * 100,
          };
        })
    );
    setSelectedQuestion(undefined);
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

  console.log("questions :>> ", questions);

  return (
    <div className="">
      <div className="w-full p-10">
        <h1 className="text-3xl text-center font-bold">Survey Builder</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center w-3/4">
            <label className="w-40 text-xl">Survey Title:</label>
            <Input
              className="text-xl border-t-0 border-r-0 border-l-0 rounded-none focus-visible:rounded-sm shadow-none drop-shadow-none"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Button type="submit">Export</Button>
          </div>
        </div>
      </div>
      <main className="grid grid-cols-10 gap-2 p-2">
        <section className="col-span-7 relative h-[600px]">
          <Button
            variant="default"
            size="icon"
            className="shadow-2xl cursor-pointer z-50 absolute right-2 top-2"
            onClick={() => onAddQuestion()}
          >
            <Plus strokeWidth={2} size={48} />
          </Button>
          {/* <Canvas
            questions={questions}
            onClick={(id) => {
              setSelectedQuestion(questions.find((item) => item.id === id));
            }}
          /> */}
          <Flow
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
              onDelete={onRemoveQuestion}
            />
          )}
        </section>
      </main>
    </div>
  );
};

export default App;