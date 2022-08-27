/* eslint-disable @next/next/no-img-element */
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Banner() {
  return (
    <div className=" relative">
      <div className=" absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src="/banner-0.jpg" alt="banner" />
        </div>
        <div>
          <img loading="lazy" src="/banner-1.jpg" alt="banner" />
        </div>
        <div>
          <img loading="lazy" src="/banner-2.jpg" alt="banner" />
        </div>
        <div>
          <img loading="lazy" src="/banner-3.jpg" alt="banner" />
        </div>
      </Carousel>
    </div>
  );
}
