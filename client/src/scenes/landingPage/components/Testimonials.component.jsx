import laptop from '../../../assets/laptop.png'
import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';

import Avatar from '@mui/material/Avatar';

import { blue } from '@mui/material/colors';


const Testimonials = () => {
    return(
        <section className="testimonials">
            <div className="testimonials__image">
                <div className="testimonials__image__wrapper">
                    <img src={laptop} alt="3d guy sitting with a laptop"  /> 
                </div>
            </div>
            <div className="testimonials__card">
                <div className="testimonials__headings">
                    <p>Stay Informed, Stay Inspired</p>
                    <h2>Latest Posts from Our Community</h2>
                </div>
                <div className="testimonials__items">
                 <Swiper
          slidesPerView={"auto"}
        centeredSlides={true}
        spaceBetween={30}
                  
                        
  
        //  autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: false,
        // }}
        navigation={true}
         modules={[Autoplay, Navigation]}
        className="mySwiper"
      >
          
     
                        {[...Array(4)].map((x, i) =>
                                  <SwiperSlide key={i} >
                 <p>Join me in supporting the flood victims in Indonesia. Every little bit helps. Let's show them they're not alone. #TogetherWeCan</p>
                               <CardHeader sx={{ padding:" 0"  }}
        avatar={
          <Avatar sx={{ bgcolor: blue[500], padding:" 0", width: 56, height: 56  }} aria-label="recipe">
            R
                                    </Avatar>
                                   
        }
        title="John Smith"
        subheader="September 14, 2023"
      />
                                
              </SwiperSlide>
   
  )}
      </Swiper>
                </div>
            </div>
        </section>
    )
}

export default Testimonials;