import React from "react";
import CanvasSection from "../components/canva";
import "@fontsource/great-vibes";
import ourStory from "../assets/9N1A4389.jpg";
import bgStory from "../assets/home_three_about_bg.png";
import bgService from "../assets/bg.jpg";

import imgSec2 from "../assets/zz.JPG";
import imgSec21 from "../assets/zzz.JPG";
import imgSec22 from "../assets/zzzz.JPG";
import imgSec23 from "../assets/zzzzzzz.JPG";
import PicturesSwiper from "../components/picturesSwiper";

const AboutUs = () => {
  return (
    <div
      style={{ fontFamily: "Times New Roman, serif" }}
      className="w-[100%] bg-white text-black flex flex-col justify-evenly items-center"
    >
      {/* Заголовок */}
      <CanvasSection />

      <div
        className="relative w-full py-[50px] flex flex-col items-center bg-white bg-cover bg-no-repeat"
        // style={{ backgroundImage: `url(${bgService})` }}
      >
        {/* Тёмный оверлей поверх фона */}
        {/* <div className="absolute inset-0 bg-black/70 z-0"></div> */}

        {/* Контент поверх оверлея */}
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1 className="text-4xl text-[#BD1619] handwriting mb-10">
            Наши услуги
          </h1>

          <div className="w-full flex flex-wrap justify-center items-center gap-[50px] px-4">
            <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border shadow-md">
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold text-black">
                  Заказ и оформление банкетов
                </h5>
                <p className="text-base font-light leading-relaxed text-inherit">
                  Мы организуем мероприятия на высшем уровне с индивидуальным
                  подходом.
                </p>
              </div>
            </div>

            <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-black-700 shadow-md">
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
                  Доставка
                </h5>
                <p className="text-base font-light leading-relaxed text-inherit">
                  Доставим ваши любимые блюда быстро и качественно.
                </p>
              </div>
            </div>

            <div className="relative flex w-80 flex-col rounded-xl bg-white bg-clip-border text-black-700 shadow-md">
              <div className="relative mx-4 -mt-6 h-40 overflow-hidden rounded-xl bg-gradient-to-r from-yellow-500 to-orange-600"></div>
              <div className="p-6">
                <h5 className="mb-2 text-xl font-semibold text-blue-gray-900">
                  Выездное оформление банкетов
                </h5>
                <p className="text-base font-light leading-relaxed text-inherit">
                  Оформим столы и меню в любом месте — выездной банкет под ключ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="w-[80%] mt-[50px] flex flex-wrap justify-center items-center gap-[20px]"
        // style={{ backgroundImage: `url(${bgService})` }}
      >
<div className="w-full md:w-[90%] lg:w-1/2 px-4 flex flex-col gap-4 text-justify">
  <h1 className="text-4xl sm:text-4xl md:text-4xl text-[#BD1619] handwriting mb-6 sm:mb-8">
    Наши отличия.
  </h1>
  <p className="text-sm sm:text-base text-[#333] leading-relaxed">
    Завершите трапезу чашечкой ароматного восточного чая и сладкими десертами, 
    которые оставят приятное послевкусие. Восточные традиции гостеприимства ждут вас. 
    Наслаждайтесь атмосферой, созданной специально для тех, кто ценит настоящий вкус!
  </p>
</div>


        <PicturesSwiper/>
      </div>

      <div
        className="w-full py-[50px] flex flex-col items-center bg-no-repeat bg-contain bg-bottom"
        style={{ backgroundImage: `url(${bgStory})` }}
      >
        <h1 className="text-4xl text-[#BD1619] handwriting mb-10">
          Наша история
        </h1>

        <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10 w-full max-w-[1200px] px-6">
          {/* Текст */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6 text-gray-700 text-justify">
            <p>
              Погрузитесь в чарующую атмосферу Востока, где каждое блюдо
              рассказывает свою историю. Мы приглашаем вас на незабываемое
              кулинарное путешествие, полное ароматов и вкусов, которые
              перенесут вас в сердце Востока. От легендарного плова до нежных
              долмы, от хрустящих самсы до воздушных чебуреков — каждый наш
              рецепт тщательно сохраняет аутентичность и традиции.
            </p>
            <p>
              Завершите трапезу чашечкой ароматного восточного чая и сладкими
              десертами, которые оставят приятное послевкусие. Восточные
              традиции гостеприимства ждут вас. Наслаждайтесь атмосферой,
              созданной специально для тех, кто ценит настоящий вкус!
            </p>
          </div>

          {/* Картинка */}
          {/* <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={ourStory}
              alt="Our Story"
              className="w-full max-w-[500px] rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            />
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
