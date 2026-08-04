"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const collegeRageImages = [
  {
    src: "/rage.png",
    alt: "College Rage photo memories page",
  },
  {
    src: "/rage1.png",
    alt: "College Rage video memories page",
  },
  {
    src: "/rage2.png",
    alt: "College Rage admin dashboard",
  },
] as const;

export default function CollegeRageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = collegeRageImages[currentIndex];

  function showPreviousImage() {
    setCurrentIndex((index) => (index - 1 + collegeRageImages.length) % collegeRageImages.length);
  }

  function showNextImage() {
    setCurrentIndex((index) => (index + 1) % collegeRageImages.length);
  }

  return (
    <div
      className="project-visual gallery-image-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="College Rage project screens"
    >
      <div className="dashboard-carousel">
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1900}
          height={937}
          sizes="(max-width: 62rem) calc(100vw - 5rem), 29vw"
        />
        <button className="carousel-control carousel-control-previous" type="button" onClick={showPreviousImage} aria-label="Show previous College Rage image">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button className="carousel-control carousel-control-next" type="button" onClick={showNextImage} aria-label="Show next College Rage image">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </div>
      <span className="sr-only" aria-live="polite">College Rage image {currentIndex + 1} of {collegeRageImages.length}</span>
    </div>
  );
}
