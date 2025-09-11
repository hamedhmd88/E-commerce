// "use client";

// import { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import Image from "next/image";
// import { dataSlider } from "@/data/data";

// export function AnimatedSlider() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);

//   useEffect(() => {
//     let timer: NodeJS.Timeout | null = null;
//     if (!isHovered) {
//       timer = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
//       }, 5000);
//     }
//     return () => {
//       if (timer) clearInterval(timer);
//     };
//   }, [isHovered]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + dataSlider.length) % dataSlider.length
//     );
//   };

//   return (
//     <div
//       className="group relative h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden  bg-gradient-to-r from-primary/10 to-secondary/10"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {dataSlider.map((slide, index) => (
//         <div
//           key={slide.id}
//           className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
//             index === currentSlide
//               ? "opacity-100 translate-x-0"
//               : index < currentSlide
//               ? "opacity-0 -translate-x-full"
//               : "opacity-0 translate-x-full"
//           }`}
//         >
//           <div className="relative h-full flex items-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent">
//             <Image
//               src={slide.image || "/placeholder.svg"}
//               alt={slide.title}
//               fill
//               className="object-cover"
//               priority
//             />
//             <div className="absolute inset-0 bg-black/40" />

//             <div className="relative z-10 container mx-auto px-4">
//               <div className="max-w-2xl text-white">
//                 <h3 className="text-xs sm:text-sm font-medium mb-2 opacity-90 animate-in fade-in-0 slide-in-from-bottom-4 duration-700">
//                   {slide.subtitle}
//                 </h3>
//                 <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance  animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-200">
//                   {slide.title}
//                 </h2>
//                 <p className="text-lg sm:text-xl mb-8 opacity-90 animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-400">
//                   {slide.description}
//                 </p>
//                 <Link href={slide.link}>
//                   <Button
//                     size="xl"
//                     variant="ghost"
//                     className="bg-primary-dark text-white hover:bg-accent transition-all duration-300 animate-in fade-in-0 slide-in-from-bottom-4 "
//                   >
//                     {slide.cta}
//                   </Button>
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {/* Navigation Buttons */}
//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
//         onClick={prevSlide}
//       >
//         <ChevronLeft className="h-6 w-6" />
//       </Button>

//       <Button
//         variant="ghost"
//         size="icon"
//         className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-all duration-200 opacity-0 group-hover:opacity-100"
//         onClick={nextSlide}
//       >
//         <ChevronRight className="h-6 w-6" />
//       </Button>

//       {/* Slide Indicators */}
//       <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex space-x-2 m-7">
//         {dataSlider.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
//               index === currentSlide ? "bg-primary" : "bg-white/50"
//             }`}
//             onClick={() => setCurrentSlide(index)}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { dataSlider } from "@/data/data";
import { motion, AnimatePresence } from "framer-motion";

export function AnimatedSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (!isHovered) {
      timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
      }, 4000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isHovered]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % dataSlider.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + dataSlider.length) % dataSlider.length
    );
  };

  // انیمیشن‌های اسلاید
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000, // کاهش مقدار x برای حرکت کمتر
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000, // کاهش مقدار x
      opacity: 0,
    }),
  };

  // انیمیشن‌های متن
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: custom * 0.2, duration: 0.5 },
    }),
  };

  // انیمیشن‌های دکمه‌های ناوبری
  const navButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    hover: {
      scale: 1.1,
      backgroundColor: "var(--primary-dark)",
      transition: { duration: 0.2 },
    },
  };

  // انیمیشن‌های نشانگرهای اسلاید
  const indicatorVariants = {
    inactive: { scale: 1, backgroundColor: "rgba(255, 255, 255, 0.5)" },
    active: { scale: 1.2, backgroundColor: "var(--primary)" },
    hover: { scale: 1.3, transition: { duration: 0.2 } },
  };

  // برای تعیین جهت انیمیشن
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newPage = (page + newDirection) % dataSlider.length;
    setPage([newPage, newDirection]);
    setCurrentSlide(newPage);
  };

  return (
    <motion.div
      className="group relative h-[300px] sm:h-[400px] md:h-[600px] overflow-hidden bg-gradient-to-r from-primary/10 to-secondary/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <div className="relative h-full flex items-center after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-1/3 after:bg-gradient-to-t after:from-black/50 after:to-transparent">
            <Image
              src={dataSlider[currentSlide].image || "/placeholder.svg"}
              alt={dataSlider[currentSlide].title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/40" />

            <div className="relative z-10 container mx-auto px-4">
              <div className="max-w-2xl text-white">
                <motion.h3
                  custom={0}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-xs sm:text-sm font-medium mb-2 opacity-90"
                >
                  {dataSlider[currentSlide].subtitle}
                </motion.h3>
                <motion.h2
                  custom={1}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-balance"
                >
                  {dataSlider[currentSlide].title}
                </motion.h2>
                <motion.p
                  custom={2}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-lg sm:text-xl mb-8 opacity-90"
                >
                  {dataSlider[currentSlide].description}
                </motion.p>
                <motion.div
                  custom={3}
                  variants={textVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Link href={dataSlider[currentSlide].link}>
                    <Button
                      size="xl"
                      variant="ghost"
                      className="bg-primary-dark text-white hover:bg-accent transition-all duration-300"
                    >
                      {dataSlider[currentSlide].cta}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      {/* <motion.div
        variants={navButtonVariants}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
        whileHover="hover"
        className="absolute left-4 top-1/2 -translate-y-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-all duration-200"
          onClick={() => paginate(-1)}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </motion.div> */}

      {/* <motion.div
        variants={navButtonVariants}
        initial="hidden"
        animate={isHovered ? "visible" : "hidden"}
        whileHover="hover"
        className="absolute right-4 top-1/2 -translate-y-1/2"
      >
        <Button
          variant="ghost"
          size="icon"
          className="text-white bg-primary hover:bg-primary-dark hover:scale-110 transition-all duration-200"
          onClick={() => paginate(1)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </motion.div> */}

      {/* Slide Indicators */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 flex space-x-2 m-7">
        {dataSlider.map((_, index) => (
          <motion.button
            key={index}
            variants={indicatorVariants}
            initial="inactive"
            animate={index === currentSlide ? "active" : "inactive"}
            whileHover="hover"
            className={`w-3 h-3 rounded-full transition-all duration-300`}
            onClick={() => {
              setPage([index, index > currentSlide ? 1 : -1]);
              setCurrentSlide(index);
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}
