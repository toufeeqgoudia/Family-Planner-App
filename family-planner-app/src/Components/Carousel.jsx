import { useState } from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import family1 from "../Images/FamilyPlannerLight.png";
import family2 from "../Images/family/family1.jpg";
import family3 from "../Images/family/family2.jpg";
import family4 from "../Images/family/family3.jpg";
import family5 from "../Images/family/family4.jpg";

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [family2, family3, family4, family5, family1,];

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (slideIndex) => {
    setCurrentIndex(slideIndex);
  };

  return (
    <div className="max-w-[1400px] sm:h-[300px] md:h-[450px] lg:h-[600px] w-full m-auto pb-10 px-4 relative z-10">
      <div
        style={{ backgroundImage: `url(${slides[currentIndex]})` }}
        className="w-full h-full rounded-2xl bg-center bg-cover duration-500"
      ></div>

      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronLeftIcon onClick={prevSlide} size={30} />
      </div>

      <div className="absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 rounded-full p-2 bg-black/20 text-white cursor-pointer">
        <ChevronRightIcon onClick={nextSlide} size={30} />
      </div>
      <div className="flex top-4 justify-center py-2">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className="text-2xl cursor-pointer"
          >
            <FiberManualRecordIcon sx={{ fontSize: "10px", marginLeft: "2px", marginRight: "2px" }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;