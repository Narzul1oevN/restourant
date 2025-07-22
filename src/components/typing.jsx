import React, { useEffect, useState, useRef } from "react";

const TypingEffect = () => {
  const words = [
    "ВОСТОЧНАЯ КУХНЯ",
    "РЕСТОРАН ВЫСШЕГО КЛАССА",
    "ЛУЧШАЯ ЕДА В ГОРОДЕ",
  ];
  const typingSpeed = 70;
  const typingDelay = 1000;

  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [displayText, setDisplayText] = useState("");
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isTyping) {
      // Печатаем символы
      if (currentCharIndex < words[currentWordIndex].length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(
            (prev) => prev + words[currentWordIndex][currentCharIndex]
          );
          setCurrentCharIndex((prev) => prev + 1);
        }, typingSpeed);
      } else {
        // После набора слова — пауза, затем начать стирать
        timeoutRef.current = setTimeout(() => {
          setIsTyping(false);
        }, typingDelay);
      }
    } else {
      // Стираем символы
      if (currentCharIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText((prev) => prev.slice(0, -1));
          setCurrentCharIndex((prev) => prev - 1);
        }, typingSpeed);
      } else {
        // Переход к следующему слову
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsTyping(true);
      }
    }

    // Очистка таймаута при размонтировании / обновлении
    return () => clearTimeout(timeoutRef.current);
  }, [
    currentCharIndex,
    isTyping,
    currentWordIndex,
    words,
    typingDelay,
    typingSpeed,
  ]);

  return (
    <div className="flex justify-center items-center text-white font-mono text-xl text-center px-4">
      <h1 className="font-light text-3xl sm:text-4xl md:text-5xl text-center text-[white]">
        РЕСТОРАН БАХТИЁР&nbsp;
        <span className="text-white relative">
          {displayText}
          <span
            className="absolute -right-2 animate-blink"
            style={{ userSelect: "none" }}
          >
            |
          </span>
        </span>
      </h1>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            color: transparent;
          }
          50% {
            color: lightgrey;
          }
        }
        .animate-blink {
          animation: blink 0.7s infinite;
        }
      `}</style>
    </div>
  );
};

export default TypingEffect;
