"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@src/components/ui/button";
import CustomizeQuestionForm from "./CustomizeQuestionForm";
import { Input } from "@src/components/ui/input";

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
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState("");

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
            id: Math.floor(Math.random() * 1000) + 1,
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
        id: Math.floor(Math.random() * 1000) + 1,
        label: "",
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

  const exportQuestions = () => {
    if (!title) {
      setTitleError("Title is required");
      return;
    }
    if (!questions.length) {
      setTitleError("You can't export an empty survey");
      return;
    }
    const questionString = JSON.stringify(
      {
        title,
        fields: questions.map((question) => {
          return {
            field_name: question.label,
            input_type: question.type,
            expected_length: question.maxLength,
            min_value: question.min,
            max_value: question.max,
            choices:
              question.type === "select" || question.type === "multiSelect"
                ? question.answers
                : undefined,
          };
        }),
      },
      null,
      2
    );

    const blob = new Blob([questionString], { type: "application/json" });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "survey.json";
    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  console.log("questions :>> ", questions);

  return (
    <div className="">
      <div className="w-full p-10">
        <h1 className="text-3xl text-center font-bold">Survey Builder</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center w-3/4">
            <label className="w-40 text-xl">Survey Title:</label>

            <div className="w-full">
              <Input
                className="text-xl border-t-0 border-r-0 border-l-0 rounded-none focus-visible:rounded-sm shadow-none drop-shadow-none"
                placeholder="Title"
                value={title}
                onChange={(e) => {
                  setTitleError("");
                  setTitle(e.target.value);
                }}
              />
              {titleError && <span className="text-red-500">{titleError}</span>}
            </div>
          </div>

          <div>
            <Button
              type="submit"
              onClick={() => {
                exportQuestions();
              }}
            >
              Export
            </Button>
          </div>
        </div>
      </div>
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
            selectedId={selectedQuestion?.id}
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
