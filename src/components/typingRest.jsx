import React, { useEffect, useState, useRef } from "react";

const TypingRest = () => {
  const words = ["ПЕРВЫЕ БЛЮДА", "ВТОРЫЕ БЛЮДА", "ДЕСЕРТЫ", "НАПИТКИ"];
  const typingSpeed = 70;
  const typingDelay = 1000;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isTyping) {
      if (currentCharIndex < words[currentWordIndex].length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev + words[currentWordIndex][currentCharIndex]);
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, typingDelay);
      }
    } else {
      if (currentCharIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setCurrentCharIndex((prev) => prev - 1);
        }, typingSpeed);
      } else {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentCharIndex, isTyping, currentWordIndex]);

  return (
    <div className="flex justify-center items-center text-white font-mono text-xl text-center px-4">
      <h1 className="font-light text-3xl sm:text-4xl md:text-[48px] text-center text-white">
        НАШИ БЛЮДА&nbsp;
        <span className="text-white relative">
          {displayText}
          <span
            className="absolute -right-2 inline-block animate-blink"
            style={{ userSelect: "none" }}
          >
            |
          </span>
        </span>
      </h1>
    </div>
  );
};

export default TypingRest;
