import { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { PauseIcon, PlayIcon } from "@heroicons/react/24/solid";
import warehouse1 from "../../assets/warehouse1.jpg";
import warehouse2 from "../../assets/warehouse2.jpg";
import warehouse3 from "../../assets/warehouse3.jpg";


//slideshow image properties
interface SlideImage {
  id: number;
  src: string;
  alt: string;
  caption?: string;
}

//custom homepage properties
interface HomepageProps {
  welcomeMessage?: string;
  images?: SlideImage[];
}

//slideshow
const defaultImages: SlideImage[] = [
  {
    id: 1,
    src: warehouse1,
    alt: "Warehouse1",
    caption: "Efficient storage",
  },
  {
    id: 2,
    src: warehouse2,
    alt: "warehouse2",
    caption: "Facilitate management",
  },
  {
    id: 3,
    src: warehouse3,
    alt: "warehouse3",
    caption: "Best use of space",
  },
];

export default function Homepage({
  welcomeMessage = "Welcome to Our Amazing Website!",
  images = defaultImages,
}: HomepageProps) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);

  // Auto-advance slideshow
  useEffect(() => {
    if (!isAutoPlaying || images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, images.length]);

  //#region slideshow functions
  const goToSlide = (index: number): void => {
    setCurrentSlide(index);
  };

  const goToPrevious = (): void => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToNext = (): void => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };
  //#endregion

  //handle mouse enter and leave
  const handleMouseEnter = (): void => {
    setIsAutoPlaying(false);
  };

  const handleMouseLeave = (): void => {
    setIsAutoPlaying(true);
  };

  //if no images available, return a basic page
  if (images.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
            {welcomeMessage}
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed font-light px-2">
            Discover amazing opportunities and unlock efficient management with
            us.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800/20 to-blue-800/20 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-purple-500/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 lg:w-96 lg:h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>

      {/* Welcome Section */}
      <div className="relative z-10 text-center py-8 sm:py-12 md:py-16 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-extrabold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4 sm:mb-6 md:mb-8 animate-pulse leading-tight">
          {welcomeMessage}
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/80 max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-3xl xl:max-w-4xl mx-auto leading-relaxed font-light px-2">
          Discover amazing opportunities and unlock efficient management with
          us.
        </p>
        <div className="mt-4 sm:mt-6 md:mt-8 flex justify-center">
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Slideshow Section */}
      <div className="relative z-10 max-w-sm sm:max-w-2xl md:max-w-4xl lg:max-w-5xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 pb-8 sm:pb-12 md:pb-16">
        <div
          className="relative bg-white/10 backdrop-blur-lg rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden group hover:shadow-purple-500/25 transition-all duration-500 hover:scale-[1.01] sm:hover:scale-[1.02]"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Main Image Display */}
          <div className="relative h-48 xs:h-56 sm:h-64 md:h-80 lg:h-96 xl:h-[500px] 2xl:h-[600px] overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
            <img
              src={images[currentSlide].src}
              alt={images[currentSlide].alt}
              className="w-full h-full object-cover transition-all duration-700 ease-in-out transform group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

            {/* Image Caption */}
            {images[currentSlide].caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 sm:p-4 md:p-6 lg:p-8">
                <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold tracking-wide">
                  {images[currentSlide].caption}
                </p>
              </div>
            )}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrevious}
              className="absolute left-2 sm:left-3 md:left-4 lg:left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 sm:hover:scale-125 shadow-lg border border-white/30 group-hover:opacity-100 opacity-70"
              aria-label="Previous image"
            >
              <ChevronLeftIcon
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                strokeWidth={2.5}
              />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 sm:right-3 md:right-4 lg:right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-1.5 sm:p-2 md:p-2.5 lg:p-3 rounded-full transition-all duration-300 hover:scale-110 sm:hover:scale-125 shadow-lg border border-white/30 group-hover:opacity-100 opacity-70"
              aria-label="Next image"
            >
              <ChevronRightIcon
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7"
                strokeWidth={2.5}
              />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center space-x-1.5 sm:space-x-2 md:space-x-3 py-3 sm:py-4 md:py-6 bg-white/5 backdrop-blur-sm">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 rounded-full transition-all duration-300 transform hover:scale-110 sm:hover:scale-125 ${
                  index === currentSlide
                    ? "bg-gradient-to-r from-purple-400 to-blue-400 scale-110 sm:scale-125 shadow-lg"
                    : "bg-white/40 hover:bg-white/60 backdrop-blur-sm"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          {/* Slide Counter */}
          <div className="absolute top-2 sm:top-3 md:top-4 lg:top-6 right-2 sm:right-3 md:right-4 lg:right-6 bg-black/60 backdrop-blur-md text-white px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full text-xs sm:text-sm font-medium border border-white/20 shadow-lg">
            {currentSlide + 1} / {images.length}
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-white/20">
            <div
              className="h-full bg-gradient-to-r from-purple-400 to-blue-400 transition-all duration-300 ease-out"
              style={{
                width: `${((currentSlide + 1) / images.length) * 100}%`,
              }}
            ></div>
          </div>
        </div>

        {/* Auto-play Toggle */}
        <div className="text-center mt-4 sm:mt-6 md:mt-8 flex flex-col sm:flex-row justify-center items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg backdrop-blur-md border ${
              isAutoPlaying
                ? "bg-green-500/20 text-green-300 hover:bg-green-500/30 border-green-400/30"
                : "bg-red-500/20 text-red-300 hover:bg-red-500/30 border-red-400/30"
            }`}
          >
            {isAutoPlaying ? (
              <PauseIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mx-auto" />
            ) : (
              <PlayIcon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 mx-auto" />
            )}{" "}
            Auto advance
          </button>

          <div className="flex items-center space-x-2 px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
            <div
              className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                isAutoPlaying ? "bg-green-400 animate-pulse" : "bg-gray-400"
              }`}
            ></div>
            <span className="text-white/80 text-xs sm:text-sm font-medium">
              {isAutoPlaying ? "Playing" : "Paused"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
