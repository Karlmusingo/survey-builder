/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Minus, Plus } from "lucide-react";
import { Button } from "@src/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@src/components/ui/select";
import { Question } from "./page";

export enum QuestionTypeEnum {
  TEXT = "text",
  NUMBER = "number",
  EMAIL = "email",
  TEXTAREA = "textarea",
  SELECT = "select",
  MULTI_SELECT = "multiSelect",
}
export type QuestionType =
  | "number"
  | "text"
  | "email"
  | "textarea"
  | "select"
  | "multiSelect"
  | undefined;

const QuestionTypeConst = {
  TEXT: "text",
  NUMBER: "number",
  EMAIL: "email",
  TEXTAREA: "textarea",
  SELECT: "select",
  MULTI_SELECT: "multiSelect",
} as const;

const formSchema = z.object({
  label: z.string().min(2, {
    message: "Question label must be at least 2 characters.",
  }),
  type: z.nativeEnum(QuestionTypeConst),
  maxLength: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
  minLength: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
  answers: z.array(
    z.object({
      answer: z.string(),
    })
  ),
  min: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
  max: z
    .string()
    .transform((v) => Number(v) || 0)
    .optional(),
});

type Props = {
  question?: Question;
  onSaveQuestion: (values: z.infer<typeof formSchema>) => void;
};

const CustomizeQuestionForm = ({ question, onSaveQuestion }: Props) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { answers: [{ answer: "" }] },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "answers",
  });

  const typeValue = form.watch("type");

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // on submit
    console.log("values :>> ", values);
    onSaveQuestion(values);
  };

  useEffect(() => {
    form.setValue("label", question?.label || "");
    form.setValue("type", question?.type || "text");
    form.setValue("answers", question?.answers || [{ answer: "" }]);
    form.setValue("maxLength", question?.maxLength || undefined);
    form.setValue("minLength", question?.minLength || undefined);
    form.setValue("min", question?.min || undefined);
    form.setValue("max", question?.max || undefined);
  }, [question]);

  useEffect(() => {
    if (typeValue === "select" || typeValue === "multiSelect") {
      form.register("label");
      form.register("type");
      form.register("answers");

      form.unregister("maxLength");
      form.unregister("minLength");
      form.unregister("min");
      form.unregister("max");

      return;
    }
    if (typeValue === "text" || typeValue === "textarea") {
      form.register("label");
      form.register("type");
      form.register("maxLength");
      form.register("minLength");

      form.unregister("min");
      form.unregister("max");
      // form.unregister("answers");
      return;
    }
    if (typeValue === "number") {
      form.register("label");
      form.register("type");
      form.register("min");
      form.register("max");

      form.unregister("maxLength");
      form.unregister("minLength");
      // form.unregister("answers");
      return;
    }
    if (typeValue === "email") {
      form.register("label");
      form.register("type");

      form.unregister("min");
      form.unregister("max");
      form.unregister("maxLength");
      form.unregister("minLength");
      // form.unregister("answers");
      return;
    }
  }, [typeValue]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="label"
          defaultValue={question?.label}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question label</FormLabel>
              <FormControl>
                <Input placeholder="label" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          defaultValue={question?.type}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.values(QuestionTypeEnum).map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        {(typeValue === "text" || typeValue === "textarea") && (
          <>
            <FormField
              control={form.control}
              name="minLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min Length</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Min" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="maxLength"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max Length</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}

        {(typeValue === "select" || typeValue === "multiSelect") &&
          fields.map((item, idx) => (
            <FormField
              key={item.id}
              control={form.control}
              name={`answers.${idx}.answer`}
              render={({ field }) => (
                <>
                  <FormItem>
                    <FormLabel>Answers {idx + 1}</FormLabel>
                    <FormControl>
                      <div className="flex w-full max-w-sm items-center space-x-2">
                        <Input placeholder="label" {...field} />

                        {idx === 0 ? (
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="cursor-pointer"
                            disabled={fields.length === 5}
                            onClick={() => append({ answer: "" })}
                          >
                            <Plus strokeWidth={2} size={32} />
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            className="cursor-pointer"
                            onClick={() => remove(idx)}
                          >
                            <Minus strokeWidth={2} size={32} />
                          </Button>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </>
              )}
            />
          ))}
        {typeValue === "number" && (
          <>
            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Min" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Max" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit">Save</Button>
      </form>
    </Form>
  );
};

export default CustomizeQuestionForm;
