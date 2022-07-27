import Image from 'next/image';
import React from 'react';
import Slider from 'react-slick';

export default function TopBanner() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className='relative'>
      <Slider {...settings}>
        {[...Array(10)].map((load, idx) => (
          <div className='relative'>
            <Image
              src='https://cdn1.codashop.com/S/content/common/images/promos/126/mu_julypromo_kh.jpg'
              alt={`banner-${idx}`}
              layout='responsive'
              width={1000}
              height={320}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
