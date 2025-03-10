"use client";

import Button from "@/components/Button";
import TimerButton from "@/components/Button/TimerButton";
import { DATA } from "@/constants";
import React, { useCallback, useState } from "react";

const Home = () => {
  const [data, setData] = useState(DATA);
  const [fruits, setFruits] = useState<typeof DATA>([]);
  const [vegetables, setVegetables] = useState<typeof DATA>([]);

  const handleSelect = useCallback(
    (index: number) => () => {
      const selectedData = data[index];
      setData((prev) => prev.toSpliced(index, 1));
      switch (selectedData.type) {
        case "Vegetable":
          setVegetables((prev) => [...prev, selectedData]);
          break;
        case "Fruit":
          setFruits((prev) => [...prev, selectedData]);
          break;
        default:
          break;
      }
    },
    [data]
  );

  const handleUnselect = useCallback(
    (index: number, type: string) => () => {
      let selectedData: (typeof DATA)[0];
      if (type === "Vegetable") {
        selectedData = vegetables[index];
        setVegetables((prev) => prev.toSpliced(index, 1));
      } else if (type === "Fruit") {
        selectedData = fruits[index];
        setFruits((prev) => prev.toSpliced(index, 1));
      }
      setData((prev) => [...prev, selectedData]);
    },
    [fruits, vegetables]
  );

  const handleRemove = useCallback(
    (data: (typeof DATA)[0], type: string) => () => {
      if (type === "Vegetable") {
        setVegetables((prev) => prev.filter((curr) => curr.name !== data.name));
      } else if (type === "Fruit") {
        setFruits((prev) => prev.filter((curr) => curr.name !== data.name));
      }

      setData((prev) => [...prev, data]);
    },
    []
  );

  return (
    <main className="p-6 min-h-screen">
      <div
        className="grid grid-cols-3 gap-2 grow"
        style={{ minHeight: "calc(100vh - 48px)" }}
      >
        <div className="flex flex-col gap-3">
          {data.map((data, i) => (
            <Button key={data.name} onClick={handleSelect(i)}>
              {data.name}
            </Button>
          ))}
        </div>
        <div className="border border-gray-200 w-full min-h-full">
          <h2 className="font-bold p-2 text-center bg-gray-200">Fruit</h2>
          <div className="flex flex-col gap-3 p-2">
            {fruits.map((data, i) => (
              <TimerButton
                key={data.name}
                onClick={handleUnselect(i, "Fruit")}
                handleRemove={handleRemove(data, data.type)}
              >
                {data.name}
              </TimerButton>
            ))}
          </div>
        </div>
        <div className="border border-gray-200 w-full min-h-full">
          <h2 className="font-bold p-2 text-center bg-gray-200">Vegetable</h2>
          <div className="flex flex-col gap-3 p-2">
            {vegetables.map((data, i) => (
              <TimerButton
                key={data.name}
                onClick={handleUnselect(i, "Vegetable")}
                handleRemove={handleRemove(data, data.type)}
              >
                {data.name}
              </TimerButton>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
