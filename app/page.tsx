"use client";
import CounterProvider from "./ui/CounterProvider";
import { useState } from "react";
import Menu from "./ui/mainMenu";
import { Counter } from "./ui/counter";

export default function Home() {
  const [modal, setModal] = useState(false);

  return (
    <>
      <CounterProvider>
        <header className="bg-white relative">
          <Menu />
        </header>
        <main>
          <Counter />
        </main>
      </CounterProvider>
    </>
  );
}
