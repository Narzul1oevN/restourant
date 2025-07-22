import React from "react";
import stove from "../assets/f9a92056-6fff-4310-9bc8-a9c3994b106e.mp4.mp4";
// import stove from "../assets/85786f6d-6e17-4217-9ceb-25a49da0b2b8.mp4.mp4";
import TypingEffect from "./typing";
import { Link } from "react-router-dom";

const CanvasSection = () => (
  <section className="relative w-full h-[600px] overflow-hidden">
    {/* Видео фон */}
    <video
      autoPlay
      muted
      loop
      playsInline
      className="absolute inset-0 w-full h-full object-cover object-bottom"
    >
      <source src={stove} type="video/mp4" />
      Ваш браузер не поддерживает видео.
    </video>

    {/* Затемнение поверх видео */}
    <div className="absolute inset-0 bg-black/60 z-10" />

    {/* Текст и кнопка */}
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center px-4">
      <h1 className="text-white text-[3.5rem] sm:text-[4.5rem] md:text-[5.5rem] font-bold drop-shadow-lg leading-tight text-center font-[\'Comic_Sans_MS\',cursive]">
        Добро Пожаловать
      </h1>
      <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold mt-2 tracking-wide text-center font-sans">
        <TypingEffect/>
      </h2>
      
      <Link
            className="mt-8 px-8 py-3 border border-white text-white text-sm font-semibold tracking-widest rounded-md hover:bg-white hover:text-black transition-all"
            to="/"
          >
            Просмотреть меню
          </Link>
    </div>
  </section>
);

export default CanvasSection;
