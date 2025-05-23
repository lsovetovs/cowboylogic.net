import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from "./SliderComponent.module.css";

import img1 from "/assets/images/image001.jpg";
import img2 from "/assets/images/image004.jpg";

// Функція для кастомних стрілок
const Arrow = ({ className, style, onClick, direction }) => (
  <div
    className={`${className} ${styles.arrow} ${direction === "left" ? styles.left : styles.right}`}
    style={{ ...style }}
    onClick={onClick}
  >
  </div>
);

const SliderComponent = () => {
  const slides = [
    { id: 1, image: img1, text: "CLStrategies" },
    { id: 2, image: img2, text: "CLPublishing" },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Увімкнути стрілки
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
  };

  return (
    <div className={styles.sliderContainer}>
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id} className={styles.slide}>
            <img src={slide.image} alt={`Slide ${slide.id}`} className={styles.image} />
            <div className={styles.overlay}>
              <h2>{slide.text}</h2>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
