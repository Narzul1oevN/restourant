import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './picturesSwiper.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import imgSec2 from "../assets/zz.JPG";
import imgSec21 from "../assets/zzz.JPG";
import imgSec22 from "../assets/zzzz.JPG";
import imgSec23 from "../assets/zzzzzzz.JPG";

export default function PicturesSwiper() {
  return (
    <>
      <Swiper
        spaceBetween={35}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide> 
            <img src={imgSec2} alt="" />
        </SwiperSlide>
        <SwiperSlide> 
            <img src={imgSec21} alt="" />
        </SwiperSlide>
        <SwiperSlide> 
            <img src={imgSec22} alt="" />
        </SwiperSlide>
        <SwiperSlide> 
            <img src={imgSec23} alt="" />
        </SwiperSlide>
      </Swiper>
    </>
  );
}
