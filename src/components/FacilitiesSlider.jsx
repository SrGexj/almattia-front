import { useState } from "react";
import { ImageWithFallback } from "./utils/ImageWithFallback";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

const slides = [
  {
    imageUrl: "https://images.unsplash.com/photo-1703355685952-03ed19f70f51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtZWV0aW5nJTIwcm9vbSUyMG9mZmljZXxlbnwxfHx8fDE3NTk4MTk2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Sala de reuniones"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1630283017802-785b7aff9aac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NzQzODU3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Espacio de trabajo"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1716703432377-0f8e64f7914c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc1OTc2NDY4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Sala de conferencias"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1505841468529-d99f8d82ef8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG9mZmljZSUyMGxvYmJ5fGVufDF8fHx8MTc1OTgzNDM0NHww&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Recepción"
  },
  {
    imageUrl: "https://images.unsplash.com/photo-1615983234885-918e049a2254?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmFpbmluZyUyMHJvb20lMjBvZmZpY2V8ZW58MXx8fHwxNzU5ODM0MzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080",
    alt: "Sala de formación"
  }
];

export const FacilitiesSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handlePrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="w-full relative">
        <div className="rounded-3xl overflow-hidden border-4 border-neutral-600">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <ImageWithFallback
                src={slides[currentSlide].imageUrl}
                alt={slides[currentSlide].alt}
                className="w-full h-[525px] object-cover"
              />
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Indicadores verticales */}
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 max-[1024px]:flex-row max-[1024px]:left-[50%] max-[1024px]:translate-x-[-50%] max-[1024px]:bottom-[-60px] max-[1024px]:top-[50%] max-[1024px]:translate-y-55">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white opacity-100 h-8 max-[1024px]:w-8 max-[1024px]:h-2"
                  : "bg-white opacity-40 hover:opacity-60 cursor-pointer"
              }`}
              aria-label={`Ir a slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-white text-3xl mb-6">Nuestras instalaciones</h2>
        <p className="text-neutral-400 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. 
          Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </p>
        <div className="flex gap-3">
          <button 
            className="rounded-full w-12 h-12  flex items-center justify-center transition-all duration-200 cursor-pointer bg-neutral-400 border-neutral-500 text-white hover:bg-neutral-500"
            onClick={handlePrevious}
          >
            <ChevronLeft 
                className="h-8 w-8 mr-1"
                strokeWidth={1.5}
            />
          </button>
          <button 
            className="rounded-full w-12 h-12  flex items-center justify-center transition-all duration-200 cursor-pointer bg-neutral-400 border-neutral-500 text-white hover:bg-neutral-500"
            onClick={handleNext}
          >
            <ChevronRight 
                className="h-8 w-8 ml-1"
                strokeWidth={1.5}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
