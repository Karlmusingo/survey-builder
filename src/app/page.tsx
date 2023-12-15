"use client";
import dynamic from "next/dynamic";
import { Plus } from "lucide-react";
import { Button } from "@src/components/ui/button";

const Canvas = dynamic(() => import("./Canvas"), {
  ssr: false,
});

const App = () => {
  return (
    <main className="grid grid-cols-10 gap-2 p-2">
      <section className="col-span-7 relative">
        <Button
          variant="default"
          size="icon"
          className="shadow-2xl cursor-pointer z-50 absolute right-2 top-2"
          onClick={() => console.log("=========>>>>>>>")}
        >
          <Plus strokeWidth={2} size={48} />
        </Button>
        <Canvas />
      </section>
      <section className="bg-blue-700 col-span-3"></section>
    </main>
  );
};

export default App;
