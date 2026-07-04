"use client";

import { useState, useEffect, useRef } from "react";

export default function TypeWriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const indexRef = useRef(index);
  const isDeletingRef = useRef(isDeleting);
  const textRef = useRef(text);

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  useEffect(() => {
    isDeletingRef.current = isDeleting;
  }, [isDeleting]);

  useEffect(() => {
    textRef.current = text;
  }, [text]);

  useEffect(() => {
    function tick() {
      const currentWord = words[indexRef.current % words.length];

      if (!isDeletingRef.current) {
        const newText = currentWord.substring(0, textRef.current.length + 1);
        setText(newText);
        textRef.current = newText;

        if (newText === currentWord) {
          timeoutRef.current = setTimeout(() => {
            setIsDeleting(true);
            isDeletingRef.current = true;
          }, 2000);
          return;
        }
      } else {
        const newText = currentWord.substring(0, textRef.current.length - 1);
        setText(newText);
        textRef.current = newText;

        if (newText === "") {
          setIsDeleting(false);
          isDeletingRef.current = false;
          setIndex((prev) => {
            const next = (prev + 1) % words.length;
            indexRef.current = next;
            return next;
          });
          return;
        }
      }

      timeoutRef.current = setTimeout(tick, isDeletingRef.current ? 50 : 100);
    }

    timeoutRef.current = setTimeout(tick, 100);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [words]);

  return (
    <span className="text-emerald-400">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}
