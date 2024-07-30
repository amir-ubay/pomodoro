"use client";
import CounterProvider from "./ui/CounterProvider";
import { useReducer } from "react";
import { Modal } from "./ui/modal";
import { Counter } from "./ui/counter";

export default function Home() {
  return (
    <main>
      <CounterProvider>
        <Counter />
        <Modal display={false} />
      </CounterProvider>
    </main>
  );
}
