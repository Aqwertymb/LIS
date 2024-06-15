import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  FreeMode,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css/bundle";

const SliderNews = () => {
  const news = [
    {
      id: 1,
      title: "Как вам? Хочется кусочек?",
      description: "Внутри классический чизкейк со свежими ягодами",
      image: "/rpk2Kkx28r4.jpg",
    },
    {
      id: 2,
      title: "Это точно лучше чем носки или пена для бритья",
      description:
        "Сыр моцарелла внутри, снаружи Творожный сыр с зеленью и пикантное украшение",
      image: "/aZt9ZjxgbZI.jpg",
    },
    {
      id: 3,
      title: "Один из любимчиков наших гостей",
      description: "Мягкие маковый коржи и прослойка лесной брусники",
      image: "/XGq4kql2h8w.jpg",
    },
    {
      id: 4,
      title: "Сладкой недели!",
      description: "Мы рады вам в любой день!",
      image: "/Fa0ERDFuEUg.jpg",
    },
  ];

  return (
    <div className="flex w-full h-[50vh] mx-auto overflow-hidden">
      <Swiper
        centeredSlides
        loop
        autoplay={{ delay: 5000, pauseOnMouseEnter: true }}
        modules={[Autoplay, Navigation, FreeMode, EffectCoverflow]}
        effect="coverflow"
        coverflowEffect={{
          rotate: 15,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        slidesPerView={1}
        breakpoints={{
          400: {
            slidesPerView: 2,
          },
          680: {
            slidesPerView: 3,
          },
        }}
        hashNavigation
      >
        {news.map((data, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-[3/4] lg:aspect-[4/3] rounded-md overflow-hidden">
              <img
                src={data.image}
                alt={data.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full min-h-[80px] bg-black/20 text-white">
                <div className="px-4 py-2 lg:p-4 text-left">
                  <h1 className="text-base leading-4 mb-2">{data.title}</h1>
                  <p className="text-xs md:text-sm line-clamp-2 xl:line-clamp-3">
                    {data.description}
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderNews;
