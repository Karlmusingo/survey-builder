"use client";
import { useCallback, useEffect, useState } from "react";
import ReactFlow, { Controls, Background } from "react-flow-renderer";
import "reactflow/dist/style.css";
import { Question } from "./flows";
import { addEdge, applyEdgeChanges, applyNodeChanges, Edge } from "reactflow";

const initialEdges = [{ id: "707-370", source: "1", target: "2" }];
// const initialEdges = [];

const initialNodes = [
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
    type: "input",
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 100, y: 100 },
  },
];

type Props = {
  questions: Question[];
  onClick: (id: number) => void;
};

function Flow({ questions, onClick }: Props) {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  console.log("edges :>> ", edges);
  console.log("nodes :>> ", nodes);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  useEffect(() => {
    console.log("questions :>> ", questions);

    const quests = [
      {
        id: 0,
        label: "0",
        type: "text",
        x: 400,
        y: 0,
      },
      {
        id: 1,
        label: "1",
        type: "text",
        x: 400,
        y: 100,
      },
      {
        id: 2,
        label: "2",
        type: "text",
        x: 400,
        y: 200,
      },
    ];
    setNodes(
      quests.map((question) => {
        return {
          id: String(question.id),
          data: { label: question.label },
          position: { x: question.x, y: question.y },
          type: "input",
        };
      })
    );
    // const newEdges: Edge[] = [];
    // quests.forEach((question, idx, arr) => {
    //   if (quests[idx + 1]) {
    //     newEdges.push({
    //       id: `${question.id}-${questions[idx + 1].id}`,
    //       source: String(question.id),
    //       target: String(quests[idx + 1].id),
    //     });
    //   }
    // });
    // console.log("newEdges :>> ", newEdges);
    // setEdges(newEdges);
  }, [questions]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    []
  );
  return (
    <div style={{ height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(e, node) => {
          console.log("node :>> ", node);
        }}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default Flow;
