import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'

// import required modules
import { EffectCoverflow, Pagination, Autoplay } from 'swiper'
const SwiperIndex = () => {
  const handleSwiperClick = (e) => {
    console.log(e)
  }
  return (
    <div className="index">
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 120,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper"
        onClick={() => handleSwiperClick(123)}
      >
        <SwiperSlide>
          <img
            src={require(`@/assets/index/banner1.png`)}
            alt="es-lint want to get"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require(`@/assets/index/banner2.png`)}
            alt="es-lint want to get"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require(`@/assets/index/banner3.png`)}
            alt="es-lint want to get"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require(`@/assets/index/banner4.png`)}
            alt="es-lint want to get"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require(`@/assets/index/banner5.png`)}
            alt="es-lint want to get"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={require(`@/assets/index/banner6.png`)}
            alt="es-lint want to get"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default SwiperIndex
