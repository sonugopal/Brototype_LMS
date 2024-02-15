import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Image from 'next/image';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const Carousel = () => {

  const images = [
    "https://i.postimg.cc/1tY9ZMQR/Banner-image-2.png",
    "https://i.postimg.cc/kgcGpQBG/Banner-image-3.png"
  ];

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      effect='fade'
      autoplay={{
        delay: 3500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={false}
      modules={[Autoplay]}
      className="mySwiper"
    >
      <div className='rounded-md'>
        {images.map((image, index) => (
          <SwiperSlide key={index} style={{ position: 'relative' }}>
            <Image
              className='h-full rounded-md w-full'
              src={image}
              alt={`image${index + 1}`}
              width={0}
              sizes="100vw"
              height={0}
              objectFit="cover"
            />
          </SwiperSlide>
        ))}
      </div>
    </Swiper>
  );
}

export default Carousel;